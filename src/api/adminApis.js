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

  try {
    const response = await axios.post(
      `${BASE_URL}/user/register`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure this is in the correct format (e.g., 'Bearer your-token')
        },
      }
    );

    console.log("Registration successful, user data:", response.data);
    return response; // Return the data directly from the response
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
          Authorization: token,
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
          Authorization: token,
        },
      }
    );

    console.log("Change password successful, user data:", response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.data.message || "Network response was not ok"}`
      );
    } else if (error.request) {
      throw new Error("Error: No response received from server.");
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export const getUserProfile = async (credentials, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/profile`, credentials, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    console.log("User profile retrieved successfully:", response.data);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.data.message || "Network response was not ok"}`
      );
    } else if (error.request) {
      throw new Error("Error: No response received from server.");
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

///user management

export const adminUpdateProfile = async (aid, profileData, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/user-mgmt/${aid}/update-profile`,
      profileData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use dynamic token
        },
      }
    );

    console.log("Profile updated successfully, user data:", response.data);

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

export const adminResetPassword = async (aid, profileData, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/user-mgmt/${aid}/reset-password`,
      profileData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use dynamic token
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
        Authorization: `Bearer ${token}`, // Use dynamic token
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

export const adminGetUserProfile = async (aid, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/v1/user-mgmt/${aid}/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use dynamic token
        },
      }
    );

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

export const listUsers = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/user-mgmt/list-users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use dynamic token
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

export const getAllRiders = async () => {
  try {
    // console.log('url : ',url);
    const response = await fetch(`${URL}/v1/rider/getAllRiders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-token-here",
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

export const getAllBookings = async () => {
  try {
    // console.log('url : ',url);
    const response = await fetch(`${URL}/v1/booking/getAllBookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-token-here",
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

export const getRiderById = async () => {
  try {
    // console.log('url : ',url);
    const response = await fetch(`${URL}/v1/routes/admin/getRiderById`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-token-here",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getRidersKYCDoc = async () => {
  try {
    // console.log('url : ',url);
    const response = await fetch(`${URL}/v1/routes/admin/getRidersKYCDoc`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-token-here",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data in api ", data);
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// for transaction table

export const getAllTransactions = async () => {
  try {
    // console.log('url : ',url);
    const response = await fetch(`${URL}/v1/rider/get-transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-token-here",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("get all Transactions data", data);

    return data;
  } catch (error) {
    console.error("Error fetching Transactions:", error);
    throw error;
  }
};
