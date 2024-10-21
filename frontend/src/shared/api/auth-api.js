import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";

export const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      console.log("API response:", response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };


  export const singup = async (name, email, password) => {
    try {
      console.log('Sending signup request with data:', { name, email, password });
      const response = await axios.post("/auth/signup", { name, email, password });
      console.log('Signup response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

export const verifyEmail = async (token) => {
  const response = await axios.get(`/auth/verify/${token}`);
  return response.data;
};