import React, { useState, useEffect, useCallback } from 'react';
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

const Map = ({refresh,setRefresh}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [parsedMarkers, setParsedMarkers] = useState([]);
  const [addresses, setAddresses] = useState({});
  const { auth } = useAuth();
  const token = auth?.token;
  console.log("refresh in try after calling ", refresh);

  // Function to fetch markers from the API
  const fetchMarkers = async () => {
    console.log("calling fetch for map ");
    
    try {
      // Reset parsed markers and addresses before fetching new data
      setParsedMarkers([]);
      setAddresses({});

      const response = await getActiveRiders(token);
      const data = response;
      console.log("Active riders in map: ", data);

      // Parsing lat, lng from the response
      const parsed = data?.map(coord => {
        const [lat, lng] = coord.split(',').map(Number); // Convert to lat, lng format
        return {
          position: { lat, lng }
        };
      });
      console.log("Parsed data: ", parsed);
      setParsedMarkers(parsed);

      // Fetch addresses for each marker
      parsed.forEach((marker, index) => {
        fetchAddress(marker.position, index);
      });

      // Reset the zoom and center of the map back to cover India
      if (map) {
        const indiaBounds = new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(6.5, 68),  // South-west corner (latitude, longitude)
          new window.google.maps.LatLng(37.5, 97)  // North-east corner (latitude, longitude)
        );
        map.fitBounds(indiaBounds); // Automatically fit the bounds to India
      }

    } catch (error) {
      console.error('Error fetching marker data:', error);
    }
  };

  useEffect(()=>{
    console.log("refresh in useeffect after calling ", refresh);
    
    if(refresh){
      fetchMarkers();
      setRefresh(false);
    }
  },[refresh])

  console.log("refresh  after calling from useeffect", refresh);

  // Fetch address for a given location using Google Geocoding API
  const fetchAddress = (location, index) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddresses(prevAddresses => ({
          ...prevAddresses,
          [index]: results[0].formatted_address
        }));
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  // Fetch markers initially when the component is mounted
  useEffect(() => {
    if (isLoaded) {
      fetchMarkers();
    }
  }, [isLoaded, token]);

  const onLoad = useCallback((map) => {
    setMap(map);
    if (isLoaded) {
      const indiaBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(6.5, 68),  // South-west corner (latitude, longitude)
        new window.google.maps.LatLng(37.5, 97)  // North-east corner (latitude, longitude)
      );
      map.fitBounds(indiaBounds); // Ensure map is centered on India initially
    }
  }, [isLoaded]);

  const onUnmount = useCallback((map) => {
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

  // Reset map center and zoom on closing InfoWindow
  const handleInfoWindowClose = () => {
    if (map) {
      const indiaBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(6.5, 68),
        new window.google.maps.LatLng(37.5, 97)
      );
      map.fitBounds(indiaBounds); // Reset to India bounds when closing InfoWindow
    }
    setSelectedMarker(null);  // Close the info window
  };

  return isLoaded ? (
    <>
      <div className='d-flex justify-content-end mb-2'>
        {/* <Button onClick={fetchMarkers}>
          Refresh Map {" "} <FontAwesomeIcon icon={faSync} />
        </Button> */}
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
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
            onCloseClick={handleInfoWindowClose} // Reset map bounds when closing InfoWindow
          >
            <div style={{ fontSize: "14px" }}> {/* Adjust the font size here */}
              <h2 style={{ fontSize: "16px", marginBottom: "5px" }}>Marker Info</h2>
              {/* <p>Latitude: {selectedMarker.position.lat}</p>
              <p>Longitude: {selectedMarker.position.lng}</p> */}
              <p>Address: {addresses[parsedMarkers.indexOf(selectedMarker)] || 'Fetching address...'}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  ) : <></>;
};

export default React.memo(Map);





