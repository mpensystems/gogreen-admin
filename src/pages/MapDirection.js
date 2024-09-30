import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API, // Replace with your actual API key
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directions, setDirections] = useState(null);
  const [currentDriverLocation, setCurrentDriverLocation] = useState({
    lat: pickup.lat + 0.0006, // Temporarily set driver location near pickup
    lng: pickup.lng + 0.0006,
  });


  const data = {

    pickupDetails:{


    },
    dropDetails:{

    },
    riderDetails:{

    }
  }

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

            // Fit the map bounds to include the route and the markers
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(pickup);
            bounds.extend(dropoff);

            if (result.routes[0].legs[0].steps) {
              result.routes[0].legs[0].steps.forEach((step) => {
                bounds.extend(step.start_location);
                bounds.extend(step.end_location);
              });
            }

            map.fitBounds(bounds); // Fit the map to the bounds
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

  // Simulate driver's movement by updating the driver's location periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate the driver's new location (move the driver slightly)
      const newLocation = {
        lat: currentDriverLocation.lat + 0.0001, // Simulate slight movement
        lng: currentDriverLocation.lng + 0.0001, // Simulate slight movement
      };
      setCurrentDriverLocation(newLocation);
    }, 50000); // Update every 5 seconds

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
          <div>
            <h2>{selectedMarker.title}</h2>
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
          setSelectedMarker({ position: pickup, title: "Pickup Location" })
        }
      />
      <Marker
        position={dropoff}
        icon={{
          url: customer,
          scaledSize: new window.google.maps.Size(50, 50), 
        }}

        onClick={() =>
          setSelectedMarker({ position: dropoff, title: "Dropoff Location" })
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
            title: "Driver Location",
          })
        }
      />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MapDirection);
