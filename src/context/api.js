import axios from "axios";

export const callApi = async (method = "GET",endpoint,  data = null) => {
  try {
    const response = await axios({
      method,
      url: `http://localhost:3000${endpoint}`,
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
