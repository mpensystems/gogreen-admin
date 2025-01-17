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
import customer from "../assets/customer.png";
import { customMapStyle } from "../Utils/MapStyle";
import { geocodeAddress, reverseGeocode } from "../Utils/GeocodeService";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const DropLocationFinder = ({
  markers,
  setMarkers,
  dropLoc,
  onCoordinatesUpdate,
}) => {
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

  const formatAddress = (location) => {
    // console.log(location,"location in api google",isPickup);

    return `${location.drop_address1}, ${location.drop_address2}, ${location.drop_house}, ${location.drop_city},${location.drop_landmark}, ${location.drop_state}`;
  };

  const handleGeocodeAddresses = async () => {
    const newMarkers = [];

    if (dropLoc) {
      const dropCoords = await geocodeAddress(formatAddress(dropLoc, false));
      if (dropCoords) {
        const dropAddress = await reverseGeocode(
          dropCoords.lat,
          dropCoords.lng
        );
        newMarkers.push({
          position: dropCoords,
          title: `Drop: ${dropAddress}`,
        });
        // Center map to drop location if pickup is also available
        if (dropCoords) {
          const bounds = new window.google.maps.LatLngBounds();
          newMarkers.forEach((marker) => bounds.extend(marker.position));
          map.fitBounds(bounds);
        }
        // else {
        //   map.setCenter(dropCoords);
        //   map.setZoom(12); // Adjust zoom level for a closer view
        // }
      }
    }

    if (newMarkers.length > 0) {
      setMarkers(newMarkers);
      onCoordinatesUpdate(newMarkers[0]?.position, newMarkers[1]?.position);
    }
  };

  useEffect(() => {
    if (map) {
      handleGeocodeAddresses();
    }
  }, [map, dropLoc]);

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
            url: customer,
            scaledSize: new window.google.maps.Size(50, 50),
          }}
          position={marker.position}
          draggable={true}
          onDragEnd={(event) => handleMarkerDragEnd(event, index)}
          onClick={() => {
            setSelectedMarker(marker);
            map.setCenter(marker.position);
            map.setZoom(15); // Zoom in on selected marker
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
          <div>
            <h2>{selectedMarker.title}</h2>
            <p>{selectedMarker.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : null;
};

export default React.memo(DropLocationFinder);
