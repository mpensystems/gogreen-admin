import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import motorbike from "../assets/motorbike.png";
import { customMapStyle } from '../Utils/MapStyle';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const Map = ({ markers }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API  // Replace with your actual API key
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

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
      {markers === 0 && markers?.map((marker, index) => (
        <Marker
          key={index}
          icon={{
            url: motorbike,
            scaledSize: new window.google.maps.Size(50, 50),
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

export default React.memo(Map);

