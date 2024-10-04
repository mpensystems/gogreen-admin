// import React, { useState, useCallback, useEffect } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import customer from "../assets/customer.png";
// import { customMapStyle } from "../Utils/MapStyle";
// import { geocodeAddress, reverseGeocode } from "../Utils/GeocodeService";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };
// const MapLocationFinder = ({ markers, setMarkers, address="kurla" }) => {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
//   });

//   const [map, setMap] = useState(null);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   // const [address, setAddress] = useState("");

//   const center = {
//     lat: 20.5937,
//     lng: 78.9629,
//   };

//   const onLoad = useCallback(
//     function callback(map) {
//       const bounds = new window.google.maps.LatLngBounds();
//       markers.forEach((marker) => bounds.extend(marker.position));
//       if (markers.length === 0) bounds.extend(center);  // Use default center if no markers
//       // map.fitBounds(bounds);
//       setMap(map);
//       console.log("CALLED_ONLOAD");
      
//     },
//     [markers]
//   );

//   const onUnmount = useCallback(() => {
//     setMap(null);
//     console.log("CALLED_ONUNMOUNT");

//   }, []);

//   const handleGeocodeAddress = async () => {
//     const coords = await geocodeAddress(address);
//     if (coords) {
//       const newMarker = {
//         position: coords,
//         title: address,
//       };

//       console.log("coords ",coords);
//       setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
//       map.setCenter(coords);
//       map.setZoom(15);  // Zoom in on new marker
//     }
//   };

//   useEffect(()=>{
//     if(map){

//       handleGeocodeAddress();
//     }
//   },[map]);

//   const handleMarkerDragEnd = async (event, index) => {
//     const newLat = event.latLng.lat();
//     const newLng = event.latLng.lng();
//     const address = await reverseGeocode(newLat,newLng);
//     console.log(address , "ADDRESS");
    



//     const updatedMarkers = markers.map((marker, i) =>
//       i === index ? { ...marker, title:address ,  position: { lat: newLat, lng: newLng } } : marker
//     );

//     setMarkers(updatedMarkers);
//     map.setCenter({ lat: newLat, lng: newLng });
//   };

//   return isLoaded ? (
//     <>

//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={4}  // Initial zoom level before markers are loaded
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//         options={{ styles: customMapStyle }}
//       >
//         {markers.map((marker, index) => (
//           <Marker
//             key={index}
//             icon={{
//               url: customer,
//               scaledSize: new window.google.maps.Size(50, 50),
//             }}
//             position={marker.position}
//             draggable={true}
//             onDragEnd={(event) => handleMarkerDragEnd(event, index)}
//             onClick={() => {
//               setSelectedMarker(marker);
//               map.setCenter(marker.position);
//               map.setZoom(15);  // Zoom in on selected marker
//             }}
//           />
//         ))}

//         {selectedMarker && (
//           <InfoWindow
//             position={selectedMarker.position}
//             onCloseClick={() => {
//               setSelectedMarker(null);  
//               map.setCenter(markers[0].position)
//             }}
//           >
//             <div>
//               <h2>{selectedMarker.title}</h2>
//               <p>{selectedMarker.description}</p>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </>
//   ) : null;
// };

// export default React.memo(MapLocationFinder);








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

const MapLocationFinder = ({ markers, setMarkers, pickupLoc, dropLoc, onCoordinatesUpdate}) => {
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
    console.log(isPickup,"ISPICKUP");
    
    if (isPickup) {
      return `${location.pickupAddress1}, ${location.pickupAddress2}, ${location.pickupHouse}, ${location.pickupCity}`;
    } else {
      return `${location.dropAddress1}, ${location.dropAddress2}, ${location.dropHouse}, ${location.dropCity}`;
    }
  };

  

  

  const handleGeocodeAddresses = async () => {
    const pickupCoords = await geocodeAddress(formatAddress(pickupLoc,true));
    const dropCoords = await geocodeAddress(formatAddress(dropLoc,false));
    console.log(dropCoords,"dropCoords");


    const newMarkers = [];
    let pickupLatLng = null;
    let dropLatLng = null;

    if (pickupCoords) {
      const address = await reverseGeocode(dropCoords.lat , dropCoords.lng);

      newMarkers.push({
        position: pickupCoords,
        title: `Pickup: ${address}`,
      });
      pickupLatLng = pickupCoords;
    

    }

    if (dropCoords) {
      // call api and pass reverse coords for showing address on map
console.log("dropCoords here : ",dropCoords);

    const address = await reverseGeocode(dropCoords.lat , dropCoords.lng);

      newMarkers.push({
        position: dropCoords,
        title: `Drop: ${address}`,
      });
      dropLatLng = dropCoords;
  

    }

    

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

    map.setCenter(dropCoords)
    map.setZoom(10)

  };


  //   const handleGeocodeAddress = async () => {
  //       const pickupCoords = await geocodeAddress(formatAddress(pickupLoc));

  // const dropCoords = await geocodeAddress(formatAddress(dropLoc));

  //   const coords = await geocodeAddress(formatAddress(pickupLoc));
  //   if (coords) {
  //     const newMarker = {
  //       position: pickupCoords,
  //       title: `Pickup: ${formatAddress(pickupLoc)}`,
  //     };

  //     if (pickupCoords) {

  //       setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);


  //           newMarkers.push({
  //             position: pickupCoords,
  //             title: `Pickup: ${formatAddress(pickupLoc)}`,
  //           });
  //           pickupLatLng = pickupCoords;
  //           map.setCenter(pickupCoords)
  //           map.setZoom(15)
      
  //         }
      
  //         if (dropCoords) {
  //           newMarkers.push({
  //             position: dropCoords,
  //             title: `Drop: ${formatAddress(dropLoc)}`,
  //           });
  //           dropLatLng = dropCoords;
  //           map.setCenter(dropCoords)
  //           map.setZoom(15)
      



  //     console.log("coords ",coords);
  //     setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  //     map.setCenter(coords);
  //     map.setZoom(15);  // Zoom in on new marker
  //   }
  // };

  // useEffect(()=>{
  //   if(map){

  //     handleGeocodeAddress();
  //   }
  // },[map]);

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
            map.setCenter(markers[0]?.position || center); // Center on the first marker or default center
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

export default React.memo(MapLocationFinder);
