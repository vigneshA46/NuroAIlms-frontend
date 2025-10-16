import axios from "axios";

export const callApi = async (method = "GET",endpoint,  data = null) => {
  try {
    const response = await axios({
      method,
      url: `https://nuroailms-backend.onrender.com${endpoint}`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};
