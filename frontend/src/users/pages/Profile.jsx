import React, { useState, useEffect, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/AuthContext';
import { getUserProfile, updateUserProfile } from '../../shared/api/users-api';
import './Profile.css';

const Profile = () => {
  const auth = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile(auth.token);
        setName(profile.name);
        setEmail(profile.email);
        if (profile.image) {
          setPreviewImage(profile.image);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [auth.token]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (profileImage) {
        formData.append('image', profileImage);
      }

      await updateUserProfile(formData, auth.token);
      setMessage('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    }
  };

  return (
    <Card className="profile">
      <h2>Profile</h2>
      {message && <p className="profile__message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            readOnly
          />
        </div>
        <div className="form-control">
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {previewImage && (
          <div className="profile__image-preview">
            <img src={previewImage} alt="Profile Preview" />
          </div>
        )}
        <button type="submit">Update Profile</button>
      </form>
    </Card>
  );
};

export default Profile;