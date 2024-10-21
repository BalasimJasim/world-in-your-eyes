import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";

export const getUsers = async ()=>{
    try {
       const response = await axios.get('/api/users')
       return response.data
    } catch (error) {
        throw(error)
    }
}

export const getUserProfile = async (token) => {
    const response = await axios.get(`/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  };

export const updateUserProfile = async (formData, token) => {
    const response = await axios.put(`/api/users/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
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

export const getUserById  = async(userID)=>{
    try {
        const response = await axios.get(`/api/users/${userID}`)
        return response.data
        
    } catch (error) {
        throw(error)
        
    }
}
export const updateUser  = async(userID,updatedUser)=>{
    try {
        const response = await axios.put(`/api/users/${userID}`,updatedUser)
        return response.data
        
    } catch (error) {
        throw(error)
        
    }
}
export const deleteUser  = async(userID)=>{
    try {
        const response = await axios.delete(`/api/users/${userID}`)
        return response.data
        
    } catch (error) {
        throw(error)
        
    }
}


export const getUserPlaces= async (userID) => {
  if (!userID) {
    console.error("User ID is undefined. Cannot fetch places.");
    return;
  }

  const url = `/api/users/${userID}/places`;
  console.log('Attempting to fetch user places from:', axios.defaults.baseURL + url);
  
  try {
    const response = await axios.get(url);
    console.log("userPlaces:", response);
    return response.data;
  } catch (error) {
    console.error('Error fetching user places:', error);
    throw error;
  }
};
