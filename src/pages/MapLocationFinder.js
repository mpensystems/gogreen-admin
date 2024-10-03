import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import customer from "../assets/customer.png";
import { customMapStyle } from "../Utils/MapStyle";
import { geocodeAddress, reverseGeocode } from "../Utils/GeocodeService";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const MapLocationFinder = ({ markers, setMarkers, address }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  // const [address, setAddress] = useState("");

  const center = {
    lat: 20.5937,
    lng: 78.9629,
  };

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => bounds.extend(marker.position));
      if (markers.length === 0) bounds.extend(center);  // Use default center if no markers
      // map.fitBounds(bounds);
      setMap(map);
      console.log("CALLED_ONLOAD");
      
    },
    [markers]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
    console.log("CALLED_ONUNMOUNT");

  }, []);

  const handleGeocodeAddress = async () => {
    const coords = await geocodeAddress(address);
    if (coords) {
      const newMarker = {
        position: coords,
        title: address,
      };
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      map.setCenter(coords);
      map.setZoom(15);  // Zoom in on new marker
    }
  };

  const handleMarkerDragEnd = async (event, index) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    const address = await reverseGeocode(newLat,newLng);
    console.log(address , "ADDRESS");
    



    const updatedMarkers = markers.map((marker, i) =>
      i === index ? { ...marker, title:address ,  position: { lat: newLat, lng: newLng } } : marker
    );

    setMarkers(updatedMarkers);
    map.setCenter({ lat: newLat, lng: newLng });
  };

  return isLoaded ? (
    <>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}  // Initial zoom level before markers are loaded
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ styles: customMapStyle }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            icon={{
              url: customer,
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            position={marker.position}
            draggable={true}
            onDragEnd={(event) => handleMarkerDragEnd(event, index)}
            onClick={() => {
              setSelectedMarker(marker);
              map.setCenter(marker.position);
              map.setZoom(15);  // Zoom in on selected marker
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => {
              setSelectedMarker(null);  
              map.setCenter(markers[0].position)
            }}
          >
            <div>
              <h2>{selectedMarker.title}</h2>
              <p>{selectedMarker.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  ) : null;
};

export default React.memo(MapLocationFinder);
