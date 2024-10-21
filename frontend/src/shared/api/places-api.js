import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";

const getAuthToken = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData || !userData.token) {
    console.warn("No auth token found");
    return null;
  }
  return userData.token;
};

export const getPlaces = async () => {
  try {
    const response = await axios.get('/api/places', {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPlace = async (placeData) => {
  try {
    let formData;
    if (placeData instanceof FormData) {
      formData = placeData;
    } else {
      formData = new FormData();
      formData.append('title', placeData.title);
      formData.append('description', placeData.description);
      formData.append('address', placeData.address);
      formData.append('creator', placeData.creator);
      if (placeData.image) {
        formData.append('image', placeData.image);
      }
    }

    const response = await axios.post("/api/places", formData, {
      headers: { 
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in createPlace API call:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getPlaceById = async (placeID) => {
  try {
    const response = await axios.get(`/api/places/${placeID}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePlace = async (placeID, updatedPlace) => {
  try {
    const response = await axios.put(`/api/places/${placeID}`, updatedPlace, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating place:", error.response ? error.response.data : error.message);

    throw error;
  }
};

export const deletePlace = async (placeID) => {
  try {
    const response = await axios.delete(`/api/places/${placeID}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};