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

import axios from "axios";
export const geocodeAddress = async (address) => {
  console.log(address, "ADDRESS");

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.REACT_APP_GOOGLE_MAP_API}`
    );

    console.log(response, "RESPONSE");

    if (response.data.status === "OK") {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error("Failed to geocode address");
      return null;
    }
  } catch (error) {
    console.error("Geocoding failed", error);
    return null;
  }
};

export const reverseGeocode = async (latitude, longitude) => {
  console.log(latitude, longitude, "DATA_FROM_MAP");

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API}`
    );
    if ((response.data.status = "Ok")) {
      const address = response.data.results[0].formatted_address;
      return address;
    } else {
      console.error("Geo code failed");
    }
  } catch (error) {
    console.error("Geo Code Failed");
  }
};
