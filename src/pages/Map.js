// import React, { useState, useEffect } from 'react';
// import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
// import motorbike from "../assets/motorbike.png";
// import { customMapStyle } from '../Utils/MapStyle';
// import { getActiveRiders } from '../api/adminApis';
// import { useAuth } from '../context/AuthContext';

// const containerStyle = {
//   width: '100%',
//   height: '500px'
// };

// const Map = () => {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
//   });

//   const [map, setMap] = useState(null);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [parsedMarkers, setParsedMarkers] = useState([]);
//   const { auth } = useAuth();
//   const token = auth?.token;

//   // Center the map on India
//   const center = {
//     lat: 20.5937,  // Latitude for India
//     lng: 78.9629   // Longitude for India
//   };

//   // Fetch marker data from API
//   useEffect(() => {
//     const fetchMarkers = async () => {
//       try {
//         const response = await getActiveRiders(token);
//         const data = response;
//         console.log("Active riders in map: ", data);

//         // Since data is an array of strings like "lat,lng"
//         const parsed = data?.map(coord => {
//           const [lat, lng] = coord.split(',').map(Number); 
//           return {
//             position: { lat, lng }
//           };
//         });
//         console.log("Parsed data: ", parsed);
//         setParsedMarkers(parsed);
//       } catch (error) {
//         console.error('Error fetching marker data:', error);
//       }
//     };

//     fetchMarkers();
//   }, [token]);

//   const onLoad = React.useCallback((map) => {
//     const bounds = new window.google.maps.LatLngBounds();
    
//     if (parsedMarkers.length > 0) {
//       parsedMarkers.forEach(marker => {
//         bounds.extend(marker.position);
//       });
//       map.fitBounds(bounds); // Fit the map to the bounds
//     } else {
//       map.setCenter(center); // Fallback to default center if no markers
//       map.setZoom(5); // Set a default zoom
//     }

//     setMap(map);
//   }, [parsedMarkers]);

//   const onUnmount = React.useCallback((map) => {
//     setMap(null);
//   }, []);

//   // Function to handle double-click on marker
//   const handleMarkerDblClick = (position) => {
//     if (map) {
//       map.setCenter(position);
//       map.setZoom(8);
//       setSelectedMarker(null);
//     }
//   };

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={4}  // Add default zoom level
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//       options={{
//         styles: customMapStyle
//       }}
//     >
//       {parsedMarkers?.map((marker, index) => (
//         <Marker
//           key={index}
//           icon={{
//             url: motorbike,
//             scaledSize: new window.google.maps.Size(50, 50),
//           }}
//           position={marker.position}
//           onDblClick={() => handleMarkerDblClick(marker.position)} // Center map on double click
//           onClick={() => setSelectedMarker(marker)} // Show InfoWindow on click
//         />
//       ))}
//       {selectedMarker && (
//         <InfoWindow
//           position={selectedMarker.position}
//           onCloseClick={() => setSelectedMarker(null)}
//         >
//           <div>
//             <h2>Marker Info</h2>
//             <p>Latitude: {selectedMarker.position.lat}</p>
//             <p>Longitude: {selectedMarker.position.lng}</p>
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   ) : <></>;
// };

// export default React.memo(Map);













// // with clusters 
// import React, { useState, useEffect } from 'react';
// import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
// import { MarkerClusterer } from '@react-google-maps/api';
// import motorbike from "../assets/motorbike.png";
// import { customMapStyle } from '../Utils/MapStyle';
// import { getActiveRiders } from '../api/adminApis';
// import { useAuth } from '../context/AuthContext';
// import {
  
//   Button
// } from "@themesberg/react-bootstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
// import { faSync } from '@fortawesome/free-solid-svg-icons';

// const containerStyle = {
//   width: '100%',
//   height: '500px'
// };

// const Map = () => {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
//   });

//   const [map, setMap] = useState(null);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [parsedMarkers, setParsedMarkers] = useState([]);
//   const { auth } = useAuth();
//   const token = auth?.token;

//   // Center the map on India
//   const center = {
//     lat: 20.5937,  // Latitude for India
//     lng: 78.9629   // Longitude for India
//   };






//   const fetchMarkers = async () => {
//     try {
//       const response = await getActiveRiders(token);
//       const data = response;
//       console.log("Active riders in map: ", data);

//       // Parsing lat,lng from the response
//       const parsed = data?.map(coord => {
//         const [lat, lng] = coord.split(',').map(Number); // Convert to lat, lng format
//         return {
//           position: { lat, lng }
//         };
//       });
//       console.log("Parsed data: ", parsed);
//       setParsedMarkers(parsed);
//     } catch (error) {
//       console.error('Error fetching marker data:', error);
//     }
//   };

//   // Fetch markers initially when the component is mounted
//   useEffect(() => {
//     fetchMarkers();
//   }, [token]);

//   const onLoad = React.useCallback((map) => {
//     const bounds = new window.google.maps.LatLngBounds();
    
//     if (parsedMarkers.length > 0) {
//       parsedMarkers.forEach(marker => {
//         bounds.extend(marker.position);
//       });
//       map.fitBounds(bounds); // Fit the map to the bounds
//     } else {
//       map.setCenter(center); // Fallback to default center if no markers
//       map.setZoom(5); // Set a default zoom
//     }

//     setMap(map);
//   }, [parsedMarkers]);

//   const onUnmount = React.useCallback((map) => {
//     setMap(null);
//   }, []);

//   // Function to handle double-click on marker
//   const handleMarkerDblClick = (position) => {
//     if (map) {
//       map.setCenter(position);
//       map.setZoom(8);
//       setSelectedMarker(null);
//     }
//   };

//   // Marker clustering function
//   const createKey = (position) => position.lat + position.lng;

//   return isLoaded ? (
//     <>
//     <div className='d-flex justify-content-end mb-2'>
//     <Button onClick={fetchMarkers} >
//         Refresh Map {" "} <FontAwesomeIcon icon={faSync} />
//      </Button>
//      </div>
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={4}  // Add default zoom level
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//       options={{
//         styles: customMapStyle
//       }}
//     >
//       <MarkerClusterer>
//         {(clusterer) => 
//           parsedMarkers?.map((marker, index) => (
//             <Marker
//               key={createKey(marker.position)}  // Unique key for each marker
//               icon={{
//                 url: motorbike,
//                 scaledSize: new window.google.maps.Size(50, 50),
//               }}
//               position={marker.position}
//               clusterer={clusterer}  // Attach markers to the clusterer
//               onDblClick={() => handleMarkerDblClick(marker.position)} // Center map on double click
//               onClick={() => setSelectedMarker(marker)} // Show InfoWindow on click
//             />
//           ))
//         }
//       </MarkerClusterer>
      
//       {selectedMarker && (
//         <InfoWindow
//           position={selectedMarker.position}
//           onCloseClick={() => setSelectedMarker(null)}
//         >
//           <div>
//             <h2>Marker Info</h2>
//             <p>Latitude: {selectedMarker.position.lat}</p>
//             <p>Longitude: {selectedMarker.position.lng}</p>
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>

//     </>
//   ) : <></>;
// };

// export default React.memo(Map);

















import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MarkerClusterer } from '@react-google-maps/api';
import motorbike from "../assets/motorbike.png";
import { customMapStyle } from '../Utils/MapStyle';
import { getActiveRiders } from '../api/adminApis';
import { useAuth } from '../context/AuthContext';
import { Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const Map = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [parsedMarkers, setParsedMarkers] = useState([]);
  const { auth } = useAuth();
  const token = auth?.token;

  // Center the map on India
  const center = {
    lat: 20.5937,  // Latitude for India
    lng: 78.9629   // Longitude for India
  };

  // Function to fetch markers from the API
  const fetchMarkers = async () => {
    try {
      const response = await getActiveRiders(token);
      const data = response;
      console.log("Active riders in map: ", data);

      // Parsing lat,lng from the response
      const parsed = data?.map(coord => {
        const [lat, lng] = coord.split(',').map(Number); // Convert to lat, lng format
        return {
          position: { lat, lng }
        };
      });
      console.log("Parsed data: ", parsed);
      setParsedMarkers(parsed);

      // Update map bounds when markers are fetched
      if (map && parsed.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        parsed.forEach(marker => {
          bounds.extend(marker.position);
        });
        map.fitBounds(bounds); // Adjust the map to fit the markers
      }

    } catch (error) {
      console.error('Error fetching marker data:', error);
    }
  };

  // Fetch markers initially when the component is mounted
  useEffect(() => {
    fetchMarkers();
  }, [token]);


  

  const onLoad = React.useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  // Function to handle double-click on marker
  const handleMarkerDblClick = (position) => {
    if (map) {
      map.setCenter(position);
      map.setZoom(8);
      setSelectedMarker(null);
      
    }
  };

  // Marker clustering function
  const createKey = (position) => position.lat + position.lng;

  return isLoaded ? (
    <>
      <div className='d-flex justify-content-end mb-2'>
        <Button onClick={fetchMarkers}>
          Refresh Map {" "} <FontAwesomeIcon icon={faSync} />
        </Button>
      </div>
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
        <MarkerClusterer>
          {(clusterer) => 
            parsedMarkers?.map((marker, index) => (
              <Marker
                key={createKey(marker.position)}  // Unique key for each marker
                icon={{
                  url: motorbike,
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
                position={marker.position}
                clusterer={clusterer}  // Attach markers to the clusterer
                onDblClick={() => handleMarkerDblClick(marker.position)} // Center map on double click
                onClick={() => setSelectedMarker(marker)} // Show InfoWindow on click
              />
            ))
          }
        </MarkerClusterer>

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h2>Marker Info</h2>
              <p>Latitude: {selectedMarker.position.lat}</p>
              <p>Longitude: {selectedMarker.position.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  ) : <></>;
};

export default React.memo(Map);








