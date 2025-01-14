// Copyright 2025 MP ENSYSTEMS ADVISORY PRIVATE LIMITED.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import motorBike from "../assets/motorbike.png";
import marker from "../assets/marker.png";
import customer from "../assets/customer.png";
import shop from "../assets/shop.png";
import { customMapStyle } from "../Utils/MapStyle";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const MapDirection = ({ pickup, dropoff }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directions, setDirections] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [currentDriverLocation, setCurrentDriverLocation] = useState({
    lat: pickup?.lat + 0.0006,
    lng: pickup?.lng + 0.0006,
  });

  const fetchAddress = async (location, setAddress) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  useEffect(() => {
    if (pickup) fetchAddress(pickup, setPickupAddress);
    if (dropoff) fetchAddress(dropoff, setDropoffAddress);
  }, [pickup, dropoff]);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const calculateRoute = () => {
    if (map) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickup,
          destination: dropoff,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);

            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(pickup);
            bounds.extend(dropoff);

            if (result.routes[0].legs[0].steps) {
              result.routes[0].legs[0].steps.forEach((step) => {
                bounds.extend(step.start_location);
                bounds.extend(step.end_location);
              });
            }

            map.fitBounds(bounds);

            const routeDistance = result.routes[0].legs[0].distance.value;
            console.log(routeDistance);
            
            if (routeDistance < 1000) {
              map.setZoom(15);
            }
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  };

  useEffect(() => {
    calculateRoute();
  }, [map, pickup, dropoff]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newLocation = {
        lat: currentDriverLocation.lat + 0.0001,
        lng: currentDriverLocation.lng + 0.0001,
      };
      setCurrentDriverLocation(newLocation);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentDriverLocation]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ styles: customMapStyle }}
    >
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div style={{ fontSize: "14px" }}> 
            <h2 style={{ fontSize: "16px", marginBottom: "5px" }}>{selectedMarker.title}</h2>
            <p>{selectedMarker.description}</p>
          </div>
        </InfoWindow>
      )}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: { strokeColor: "blue" },
            suppressMarkers: true,
          }}
        />
      )}
      <Marker
        position={pickup}
        icon={{
          url: shop,
          scaledSize: new window.google.maps.Size(50, 50),
        }}
        onClick={() =>
          setSelectedMarker({
            position: pickup,
            title: "Pickup Location",
            description: pickupAddress,
          })
        }
      />
      <Marker
        position={dropoff}
        icon={{
          url: customer,
          scaledSize: new window.google.maps.Size(50, 50),
        }}
        onClick={() =>
          setSelectedMarker({
            position: dropoff,
            title: "Drop Location",
            description: dropoffAddress,
          })
        }
      />
      <Marker
        position={currentDriverLocation}
        icon={{
          url: motorBike,
          scaledSize: new window.google.maps.Size(50, 50),
        }}
        onClick={() =>
          setSelectedMarker({
            position: currentDriverLocation,
            title: "Rider Location",
          })
        }
      />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MapDirection);
