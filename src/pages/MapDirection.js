// import React from 'react';
// import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '500px'
// };

// const MapDirection = ({ pickup, dropoff }) => {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyBJCy0a0_N7QgNdSPpKabSeH3Q5nLFFnSc"  // Replace with your actual API key
//   });

//   const [map, setMap] = React.useState(null);
//   const [selectedMarker, setSelectedMarker] = React.useState(null);
//   const [directions, setDirections] = React.useState(null); // State to hold directions

//   const center = {
//     lat: 20.5937, // Latitude for India
//     lng: 78.9629  // Longitude for India
//   };

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     bounds.extend(center);
//     map.fitBounds(bounds);
//     setMap(map);
//   }, [ pickup, dropoff]);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   const customMapStyle = [
//     {
//       "featureType": "administrative.land_parcel",
//       "elementType": "labels",
//       "stylers": [{ "visibility": "off" }]
//     },
//     {
//       "featureType": "poi",
//       "elementType": "labels.text",
//       "stylers": [{ "visibility": "off" }]
//     },
//     {
//       "featureType": "road",
//       "elementType": "labels.icon",
//       "stylers": [{ "visibility": "off" }]
//     },
//     {
//       "featureType": "road.local",
//       "elementType": "labels",
//       "stylers": [{ "visibility": "off" }]
//     },
//     {
//       "featureType": "transit",
//       "stylers": [{ "visibility": "off" }]
//     }
//   ];

//   // Function to calculate directions
//   const calculateRoute = () => {
//     if (map) {
//       const directionsService = new window.google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: pickup,
//           destination: dropoff,
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             setDirections(result);
//           } else {
//             console.error(`Error fetching directions: ${result}`);
//           }
//         }
//       );
//     }
//   };

//   // Calculate route on component mount
//   React.useEffect(() => {
//     calculateRoute();
//   }, [map, pickup, dropoff]);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={15} // Adjust zoom level as needed
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//       options={{ styles: customMapStyle }}
//     >

//       {selectedMarker && (
//         <InfoWindow
//           position={selectedMarker.position}
//           onCloseClick={() => setSelectedMarker(null)}
//         >
//           <div>
//             <h2>{selectedMarker.title}</h2>
//             <p>{selectedMarker.description}</p>
//           </div>
//         </InfoWindow>
//       )}
//       {directions && (
//         <DirectionsRenderer
//           directions={directions}
//           options={{
//             polylineOptions: { strokeColor: 'blue' },
//             suppressMarkers: true // Optionally hide default markers
//           }}
//         />
//       )}

//       {
//          <Marker
//         //  key={index}
//          position={pickup}
//          onDblClick={() => handleMarkerDblClick(position)} // Center map on double click
//          onClick={() => setSelectedMarker(marker)} // Show InfoWindow on click
//        />
//       }
//       {/* Removed markers for pickup and dropoff */}
//     </GoogleMap>
//   ) : <></>;
// };

// export default React.memo(MapDirection);

// import React from 'react';
// import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '500px'
// };

// const MapDirection = ({ pickup, dropoff }) => {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyBJCy0a0_N7QgNdSPpKabSeH3Q5nLFFnSc"  // Replace with your actual API key
//   });

//   const [map, setMap] = React.useState(null);
//   const [selectedMarker, setSelectedMarker] = React.useState(null);
//   const [directions, setDirections] = React.useState(null);

// //   const center = {
// //     lat: 20.5937, // Latitude for India
// //     lng: 78.9629  // Longitude for India
// //   };

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     // bounds.extend(center);
//     map.fitBounds(bounds);
//     setMap(map);
//   }, [pickup, dropoff]);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   const customMapStyle = [
//     { "featureType": "administrative.land_parcel", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
//     { "featureType": "poi", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] },
//     { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
//     { "featureType": "road.local", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
//     { "featureType": "transit", "stylers": [{ "visibility": "off" }] }
//   ];

//   const calculateRoute = () => {
//     if (map) {
//       const directionsService = new window.google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: pickup,
//           destination: dropoff,
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             setDirections(result);
//           } else {
//             console.error(`Error fetching directions: ${status}`);
//           }
//         }
//       );
//     }
//   };

//   React.useEffect(() => {
//     calculateRoute();
//   }, [map, pickup, dropoff]);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//     //   center={center}
//       zoom={15} // Adjust zoom level as needed
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//       options={{ styles: customMapStyle }}
//     >
//       {selectedMarker && (
//         <InfoWindow
//           position={selectedMarker.position}
//           onCloseClick={() => setSelectedMarker(null)}
//         >
//           <div>
//             <h2>{selectedMarker.title}</h2>
//             <p>{selectedMarker.description}</p>
//           </div>
//         </InfoWindow>
//       )}
//       {directions && (
//         <DirectionsRenderer
//           directions={directions}
//           options={{
//             polylineOptions: { strokeColor: 'blue' },
//             suppressMarkers: true
//           }}
//         />
//       )}
//       <Marker
//         position={pickup}
//         onClick={() => setSelectedMarker({ position: pickup, title: 'Pickup Location' })}
//       />
//       <Marker
//         position={dropoff}
//         onClick={() => setSelectedMarker({ position: dropoff, title: 'Dropoff Location' })}
//       />
//     </GoogleMap>
//   ) : <></>;
// };

// export default React.memo(MapDirection);

// import React, { useState, useEffect, useCallback } from 'react';
// import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '500px'
// };

// const MapDirection = ({ pickup, dropoff, driverLocation }) => {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyBJCy0a0_N7QgNdSPpKabSeH3Q5nLFFnSc"  // Replace with your actual API key
//   });

//   const [map, setMap] = useState(null);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [currentDriverLocation, setCurrentDriverLocation] = useState(driverLocation); // State to track driver's location

//   const onLoad = useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);
//     setMap(map);
//   }, []);

//   const onUnmount = useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   const customMapStyle = [
//     { "featureType": "administrative.land_parcel", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
//     { "featureType": "poi", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] },
//     { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
//     { "featureType": "road.local", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
//     { "featureType": "transit", "stylers": [{ "visibility": "off" }] }
//   ];

//   const calculateRoute = () => {
//     if (map) {
//       const directionsService = new window.google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: pickup,
//           destination: dropoff,
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             setDirections(result);
//           } else {
//             console.error(`Error fetching directions: ${status}`);
//           }
//         }
//       );
//     }
//   };

//   useEffect(() => {
//     calculateRoute();
//   }, [map, pickup, dropoff]);

//   // Simulate driver's movement by updating the driver's location periodically
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       // Simulate the driver's new location (move the driver slightly)
//       const newLocation = {
//         lat: currentDriverLocation.lat + 0.0001,  // Simulate movement
//         lng: currentDriverLocation.lng + 0.0001,  // Simulate movement
//       };
//       setCurrentDriverLocation(newLocation);
//     }, 5000); // Update every 5 seconds

//     return () => clearInterval(intervalId);  // Cleanup interval on component unmount
//   }, [currentDriverLocation]);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       zoom={15}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//       options={{ styles: customMapStyle }}
//     >
//       {selectedMarker && (
//         <InfoWindow
//           position={selectedMarker.position}
//           onCloseClick={() => setSelectedMarker(null)}
//         >
//           <div>
//             <h2>{selectedMarker.title}</h2>
//             <p>{selectedMarker.description}</p>
//           </div>
//         </InfoWindow>
//       )}
//       {directions && (
//         <DirectionsRenderer
//           directions={directions}
//           options={{
//             polylineOptions: { strokeColor: 'blue' },
//             suppressMarkers: true
//           }}
//         />
//       )}
//       <Marker
//         position={pickup}
//         onClick={() => setSelectedMarker({ position: pickup, title: 'Pickup Location' })}
//       />
//       <Marker
//         position={dropoff}
//         onClick={() => setSelectedMarker({ position: dropoff, title: 'Dropoff Location' })}
//       />
//       {/* Custom bike marker for the driver's location */}
//       <Marker
//         position={currentDriverLocation}
//         icon={{
//           url: 'https://c8.alamy.com/comp/2CC8EP8/delivery-man-riding-motorbike-scooter-with-the-box-concept-of-fast-delivery-in-the-city-male-courier-with-parcel-box-on-his-back-with-goods-food-and-products-cartoon-flat-vector-illustration-2CC8EP8.jpg',  // Replace with your bike image URL
//           scaledSize: new window.google.maps.Size(50, 50) // Adjust the size as needed
//         }}
//         onClick={() => setSelectedMarker({ position: currentDriverLocation, title: 'Driver Location' })}
//       />
//     </GoogleMap>
//   ) : <></>;
// };

// export default React.memo(MapDirection);

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




const containerStyle = {
  width: "100%",
  height: "500px",
};

const MapDirection = ({ pickup, dropoff }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBJCy0a0_N7QgNdSPpKabSeH3Q5nLFFnSc", // Replace with your actual API key
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

  const customMapStyle = [
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
  ];

  // const calculateRoute = () => {
  //   if (map) {
  //     const directionsService = new window.google.maps.DirectionsService();
  //     directionsService.route(
  //       {
  //         origin: pickup,
  //         destination: dropoff,
  //         travelMode: window.google.maps.TravelMode.DRIVING,
  //       },
  //       (result, status) => {
  //         if (status === window.google.maps.DirectionsStatus.OK) {
  //           setDirections(result);
  //         } else {
  //           console.error(`Error fetching directions: ${status}`);
  //         }
  //       }
  //     );
  //   }
  // };

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

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
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
          scaledSize: new window.google.maps.Size(50, 50), // Adjust the size as needed
        }}
        onClick={() =>
          setSelectedMarker({ position: pickup, title: "Pickup Location" })
        }
      />
      <Marker
        position={dropoff}
        icon={{
          url: customer,
          scaledSize: new window.google.maps.Size(50, 50), // Adjust the size as needed
        }}

        onClick={() =>
          setSelectedMarker({ position: dropoff, title: "Dropoff Location" })
        }
      />
      {/* Custom bike marker for the driver's location */}
      <Marker
        position={currentDriverLocation}
        icon={{
          url: motorBike,
          scaledSize: new window.google.maps.Size(50, 50), // Adjust the size as needed
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
