import axios from "axios";

const localaddress = "http://localhost:3000"
const cloudaddress = "https://nuroailms-backend.onrender.com"

export const callApi = async (method = "GET",endpoint,  data = null) => {
  try {
    const response = await axios({
      method,
      url: `${localaddress}${endpoint}`,
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
