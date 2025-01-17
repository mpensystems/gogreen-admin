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

const url = process.env.REACT_APP_BACKEND_URL;
const URL = "http://localhost:8080";
const BASE_URL = "http://34.93.209.158:8004/v1";

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Login successful, user data:", response.data);
    return response;
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || "Network response was not ok";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error, please try again later.");
    }
  }
};

export const userRegister = async (credentials, token) => {
  console.log(credentials, "CREDENTIALS");
  console.log(token, "token");

  try {
    const response = await axios.post(
      `${BASE_URL}/user/register`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    console.log("Registration successful, user data:", response.data);
    return response; 
  } catch (error) {
    // Handle error
    if (error.response) {
      const errorMessage =
        error.response.data.message || "Network response was not ok";
      console.error("Error registering user:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Error registering user:", error.message);
      throw new Error("Network error, please try again later.");
    }
  }
};

export const userUpdateProfile = async (credentials, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/update-profile`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Profile updated successfully:", response.data);
    return response;
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || "Network response was not ok";
      console.error("Error registering user:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Error registering user:", error.message);
      throw new Error("Network error, please try again later.");
    }
  }
};

export const userChangePassword = async (credentials, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/change-password`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` ,
        },
      }
    );

    console.log("Change password successful, user data:", response);

    return response.data;
  } catch (error) {

    console.log(error);
    
    if (error.response) {
      throw new Error(
        `Error: ${error.response.data}`
      );
    } else if (error.request) {
      throw new Error("Error: No response received from server.");
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export const getLoggedInUser = async (token) => {
  try {
    console.log('token in rider get api for single rider : ',token);
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` ,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};




export const adminResetPassword = async (aid, profileData, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/user-mgmt/${aid}/reset-password`,
      profileData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    console.log("admin reset Password successfully, user data:", response.data);

    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error updating profile:", error.response.data);
      throw new Error(
        `Error: ${error.response.data.message || "Network response was not ok"}`
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Error:", error.message);
      throw error;
    }
  }
};

export const firstRegister = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/activation-status`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error updating profile:", error.response.data);
      throw new Error(
        `Error: ${error.response.data.message || "Network response was not ok"}`
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Error:", error.message);
      throw error;
    }
  }
};







// booking Apis 

export const createNewBooking = async (formData,token) => {
  console.log("token : ",token);
 

    console.log("formData inside create booking api : ",formData);

  try {
    const response = await axios.post(
      `${BASE_URL}/bookings/create`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,  
        },
      }
    );

    console.log("Booking created successfully : ", response.data);

    return response;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "Unknown error occurred";
      console.error("Error Creating booking:", error);
      throw new Error(`Error: ${errorMessage}`);
    } else if (error.request) {
      console.error("Error Creating booking: No response received");
      throw new Error("Error: No response received from the server");
    } else {
      console.error("Error Creating booking:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export const getAllBookings = async (token) => {

  console.log("token in api booking: ",token);

  try {
    const response = await fetch(`${BASE_URL}/bookings/latest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("get all Bookings data", data);

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getBookingByID = async (token,bid) => {

  console.log("token in api booking: ",token);

  try {
    const response = await fetch(`${BASE_URL}/bookings/${bid}/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("get Booking data by id", data);

    return data;
  } catch (error) {
    console.error("Error fetching Booking with id:", error);
    throw error;
  }
};


// Rider Api's
export const getAllRiders = async (token) => {
  try {
    // console.log('url : ',url);
    const response = await fetch(`${BASE_URL}/riders/get-all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("get all riders data", data);

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getRiderById = async (rid,token) => {
  try {
    console.log('token in rider get api for single rider : ',token);
    console.log('rid in rider get api for single rider : ',rid);

    const response = await fetch(`${BASE_URL}/riders/${rid}/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` ,
      },
    });


    // console.log(response,"response here");
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // const data =  response;
    const data = await response.json();
    console.log("response data of rider : ",data);
    return data;
  } catch (error) {
    console.error("Error fetching riders:", error);
    throw error;
  }
};


export const fetchAggregation = async (token,rid,aggregation) => {

  console.log("token in api user get: ",token);
  console.log("id in api user get: ",rid);
  console.log("aggregation in api user get: ",aggregation);

  try {
    const response = await fetch(`${BASE_URL}/riders/${rid}/earnings/${aggregation}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("get aggregation  : ", data);

    return data;
  } catch (error) {
    console.error("Error fetching active riders", error);
    throw error;
  }
};


export const getRiderTrips = async (token,rid,startDate,endDate) => {
  try {
    console.log('token in rider get api for single trip : ',token);
    console.log('token in rider get api for single trip : ',rid);

    const requestBody = {
      start_date: startDate,
      end_date: endDate,
    };
  // console.log("request body : ",requestBody);
  
    const response = await fetch(`${BASE_URL}/riders/${rid}/earnings-ledger`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` ,
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data for each riders trip : ",data);
    
    return data;
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error;
  }
};



// Kyc Api's
export const getKycApproved = async (token, rid, bodyData) => {
  try {
    console.log('url in getKycApproved: ', `${BASE_URL}/kyc/${rid}/approve`);

    const response = await fetch(`${BASE_URL}/kyc/${rid}/approve`, {
      method: "POST",      
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData), 
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const text = await response.text(); 
    const data = text ? JSON.parse(text) : {}; 
    console.log("KYC approved data", data);

    return data;
  } catch (error) {
    console.error("Error approving KYC:", error);
    throw error;
  }
};


export const rejectKyc = async (token, rid, error_msg) => {
  try {
    console.log('url in rejectKyc: ', `${BASE_URL}/kyc/${rid}/reject`);

    const response = await fetch(`${BASE_URL}/kyc/${rid}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ error_msg }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    console.log("KYC reject data", data);

    return data;
  } catch (error) {
    console.error("Error rejecting KYC:", error);
    throw error;
  }
};

export const getKycDetailsOfRider = async (token, rid) => {
  try {

    const response = await fetch(`${BASE_URL}/kyc/${rid}/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("data for kyc of rider using rid : ", response)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    console.log("KYC reject data", data);

    return data;
  } catch (error) {
    console.error("Error rejecting KYC:", error);
    throw error;
  }
};



export const getImage = async (token, rid, fileid) => {
  console.log("token rid and fieldId gere in api : ",token , rid, fileid);
  
  try {
    const response = await fetch(`${BASE_URL}/kyc/${rid}/doc/${fileid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const imageUrl = response; 
    console.log("check hete in api : ",imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};


// user Manangment
export const getUserList = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/user-mgmt/list-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("get all users data", data);

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};


export const getUserByID = async (token,aid) => {

  console.log("token in api user get: ",token);

  try {
    const response = await fetch(`${BASE_URL}/user-mgmt/${aid}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("get user data by id", data);

    return data;
  } catch (error) {
    console.error("Error fetching user with id:", error);
    throw error;
  }
};


export const updateUserProfile = async (formData,token,aid) => {
  console.log("token : ",token);
  console.log("formData inside Updating User profile api : ",formData);

  try {
    const response = await axios.post(
      `${BASE_URL}/user-mgmt/${aid}/update-profile`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,  
        },
      }
    );

    console.log("profile Updated successfully : ", response.data);

    return response;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "Unknown error occurred";
      console.error("Error Updating User profile:", errorMessage);

      throw new Error(`Error: ${errorMessage}`);
    }  else {
      console.error("Error Updating User profile:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
};




export const updateCurrentUser = async ( token,formdata) => {
  try {
    console.log("inside frontend api call");
    const response = await axios.post(
      `${BASE_URL}/user/update-profile`,
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`, 
        },
      }
    );

    console.log("Profile updated successfully:", response.data);
    return response;
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || "Network response was not ok";
  
      throw new Error(errorMessage);
    } else {
      console.error("Error registering user:", error.message);
      throw new Error("Network error, please try again later.");
    }
  }
};


// Home Statistics

export const getHomeStatistics = async (token,aid) => {

  console.log("token in api user get: ",token);

  try {
    const response = await fetch(`${BASE_URL}/home/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("get home stat data in api : ", data);

    return data;
  } catch (error) {
    console.error("Error fetching user with id:", error);
    throw error;
  }
};

export const getActiveRiders = async (token) => {

  console.log("token in api user get: ",token);

  try {
    const response = await fetch(`${BASE_URL}/home/active-rider-map`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("get active rider data in api : ", data);

    return data;
  } catch (error) {
    console.error("Error fetching active riders", error);
    throw error;
  }
};