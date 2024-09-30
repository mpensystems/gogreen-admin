
// import React from 'react';
// import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '500px'
// };

// // Center the map on India
// const center = {
//   lat: 20.5937,  // Latitude for India
//   lng: 78.9629   // Longitude for India
// };

// // List of markers (e.g., New Delhi and Mumbai)
// const markers = [
//   {
//     position: { lat: 28.6139, lng: 77.2090 }, // New Delhi
//     title: 'New Delhi',
//     description: 'Capital city of India'
//   },
//   {
//     position: { lat: 19.0760, lng: 72.8777 }, // Mumbai
//     title: 'Mumbai',
//     description: 'Financial capital of India'
//   },
//   {
//     position: { lat: 19.0100, lng: 72.3922 }, // Mumbai
//     title: 'Mumbai',
//     description: 'Financial capital of India'
//   },
//   {
//     position: { lat: 13.0827, lng: 80.2707 }, // Chennai
//     title: 'Chennai',
//     description: 'Cultural capital of South India'
//   },
//   // Add more markers as needed
// ];

// function Map() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyBJCy0a0_N7QgNdSPpKabSeH3Q5nLFFnSc"  // Replace with your actual API key
//   });

//   const [map, setMap] = React.useState(null);
//   const [selectedMarker, setSelectedMarker] = React.useState(null); // State for InfoWindow

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     bounds.extend(center);
//     markers.forEach(marker => bounds.extend(marker.position)); // Adjust bounds for all markers
//     map.fitBounds(bounds);
//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   // Map style (if any)
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

//   // Function to handle double-click on marker
//   const handleMarkerDblClick = (position) => {
//     if (map) {
//       map.setCenter(position); // Center map on marker
//       map.setZoom(8); // Optional: Zoom in when centered
//       setSelectedMarker(null); // Clear selected marker to prevent InfoWindow opening
//     }
//   };

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={4}  // Initial zoom level
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//       options={{
//         styles: customMapStyle 
//       }}
//     >
//       {markers.map((marker, index) => (
//         <Marker 
//           key={index} 
//           position={marker.position} 
//           onDblClick={() => handleMarkerDblClick(marker.position)} // Center map on double click
//           onClick={() => setSelectedMarker(marker)} // Show InfoWindow on click
//         />
//       ))}
//       {selectedMarker && (
//         <InfoWindow
//           position={selectedMarker.position}
//           onCloseClick={() => setSelectedMarker(null)} // Close InfoWindow when clicked
//         >
//           <div>
//             <h2>{selectedMarker.title}</h2>
//             <p>{selectedMarker.description}</p>
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   ) : <></>;
// }

// export default React.memo(Map);



import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import motorbike from "../assets/motorbike.png";


// Default container style for the map
const containerStyle = {
  width: '100%', 
  height: '500px'
};

// Custom Map component
const CustomMap = ({ markers }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBJCy0a0_N7QgNdSPpKabSeH3Q5nLFFnSc"  // Replace with your actual API key
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null); // State for InfoWindow

  // Center the map on India
  const center = {
    lat: 20.5937,  // Latitude for India
    lng: 78.9629   // Longitude for India
  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(center);
    markers && markers.forEach(marker => bounds.extend(marker.position));
    map.fitBounds(bounds);
    setMap(map);
  }, [markers]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Map style (if any)
  const customMapStyle = [
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "transit",
      "stylers": [{ "visibility": "off" }]
    }
  ];

  // Function to handle double-click on marker
  const handleMarkerDblClick = (position) => {
    if (map) {
      map.setCenter(position); 
      map.setZoom(8); 
      setSelectedMarker(null);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4} 
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: customMapStyle 
      }}
    >
      {markers && markers?.map((marker, index) => (
        <Marker 
          key={index} 
          icon={{
            url: motorbike,
            scaledSize: new window.google.maps.Size(50, 50), // Adjust the size as needed
          }}
          position={marker.position} 
          onDblClick={() => handleMarkerDblClick(marker.position)} // Center map on double click
          onClick={() => setSelectedMarker(marker)} // Show InfoWindow on click
        />

        
      ))}
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
    </GoogleMap>
  ) : <></>;
};

export default React.memo(CustomMap);
