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


import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { customMapStyle } from "../Utils/MapStyle";
import { geocodeAddress, reverseGeocode } from "../Utils/GeocodeService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import customer from "../assets/customer.png";
import shop from "../assets/shop.png";
const containerStyle = {
  width: "100%",
  height: "500px",
};

const MapLocationFinder = ({
  markers,
  setMarkers,
  pickupLoc,
  dropLoc,
  onCoordinatesUpdate,
}) => {
  console.log("pickup loc in map", pickupLoc);
  console.log("drop loc in map", dropLoc);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const center = {
    lat: 20.5937,
    lng: 78.9629,
  };

  const onLoad = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => bounds.extend(marker.position));
      if (markers.length === 0) bounds.extend(center);
      setMap(map);
      console.log("CALLED_ONLOAD");
    },
    [markers]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
    console.log("CALLED_ONUNMOUNT");
  }, []);

  const formatAddress = (location, isPickup) => {
    console.log(location, "location in api google", isPickup);

    if (isPickup) {
      return `${location.pickup_address1},${location.pickup_address2},${location.pickup_house},${location.pickup_city},${location.pickup_landmark},${location.pickup_state}`;
    } else {
      return `${location.drop_address1}, ${location.drop_address2}, ${location.drop_house}, ${location.drop_city},${location.drop_landmark}, ${location.drop_state}`;
    }
  };

  const handleGeocodeAddresses = async () => {
    try {
      const pickupCoords = pickupLoc
        ? await geocodeAddress(formatAddress(pickupLoc, true))
        : null;
      const dropCoords = dropLoc
        ? await geocodeAddress(formatAddress(dropLoc, false))
        : null;

      console.log("Geocoded Pickup Coordinates:", pickupCoords);
      console.log("Geocoded Drop Coordinates:", dropCoords);

      const newMarkers = [];
      let pickupLatLng = null;
      let dropLatLng = null;

      if (pickupCoords) {
        const address = await reverseGeocode(
          pickupCoords.lat,
          pickupCoords.lng
        );
        newMarkers.push({
          position: pickupCoords,
          title: `Pickup: ${address}`,
        });
        pickupLatLng = pickupCoords;
      }

      if (dropCoords) {
        const address = await reverseGeocode(dropCoords.lat, dropCoords.lng);
        newMarkers.push({
          position: dropCoords,
          title: `Drop: ${address}`,
        });
        dropLatLng = dropCoords;
      }

      setMarkers(newMarkers);

      if (map) {
        if (newMarkers.length === 1) {
          map.setCenter(newMarkers[0].position);
          map.setZoom(6);
        } else if (newMarkers.length === 2) {
          if (newMarkers.length > 0) {
            setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);

            if (map) {
              const bounds = new window.google.maps.LatLngBounds();
              newMarkers.forEach((marker) => bounds.extend(marker.position));
              map.fitBounds(bounds); // Adjust map to fit all markers
            }
          }

          if (pickupLatLng || dropLatLng) {
            onCoordinatesUpdate(pickupLatLng, dropLatLng);
          }

          map.setCenter(dropCoords);
          map.setZoom(10);
        }
      }

      onCoordinatesUpdate(pickupLatLng, dropLatLng);
    } catch (error) {
      console.error("Error in geocoding addresses:", error);
    }
  };

  useEffect(() => {
    if (map) {
      handleGeocodeAddresses();
    }
  }, [map, pickupLoc, dropLoc]);

  const handleMarkerDragEnd = async (event, index) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    const address = await reverseGeocode(newLat, newLng);
    console.log(address, "ADDRESS");

    const updatedMarkers = markers.map((marker, i) =>
      i === index
        ? { ...marker, title: address, position: { lat: newLat, lng: newLng } }
        : marker
    );

    setMarkers(updatedMarkers);
    map.setCenter({ lat: newLat, lng: newLng });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4} // Initial zoom level before markers are loaded
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ styles: customMapStyle }}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          icon={{
            url: marker.title.toLowerCase().includes("pickup")
              ? shop
              : customer,
            scaledSize: new window.google.maps.Size(50, 50),
          }}
          position={marker.position}
          draggable={true}
          onDragEnd={(event) => handleMarkerDragEnd(event, index)}
          onClick={() => {
            setSelectedMarker(marker);

            map.setCenter(marker.position);
            map.setZoom(15);
          }}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={() => {
            setSelectedMarker(null);
            map.setCenter(markers[0]?.position || center);
          }}
        >
          <div className="card shadow-sm border-0">
            <div className="card-body p-3">
              <h5
                className="card-title mb-2"
                style={{
                  fontSize: "1rem",
                  color: "black",
                  padding: "5px",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              >
                {selectedMarker.title}
              </h5>
              <p
                className="card-text text-muted mb-1"
                style={{ fontSize: "0.9rem" }}
              >
                {selectedMarker.description}
              </p>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : null;
};

export default React.memo(MapLocationFinder);
