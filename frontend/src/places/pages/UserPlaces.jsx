import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Placelist from '../components/PlaceList';
import { getUserPlaces } from '../../shared/api/users-api';
import { AuthContext } from '../../shared/context/AuthContext.js';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId: urlUserId } = useParams();
  const auth = useContext(AuthContext);

  useEffect(() => {
    let isActive = true;  // For cleanup/prevent memory leaks

    const fetchPlaces = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get userID either from URL or auth context
        const userIdToFetch = urlUserId || auth.userId;
        
        // Wait for auth context to be ready
        if (!userIdToFetch) {
          console.log('Waiting for user ID to be available...');
          return; // Exit early and wait for next effect trigger
        }

        console.log('Fetching places for user ID:', userIdToFetch);
        const userPlaces = await getUserPlaces(userIdToFetch);
        
        // Only update state if component is still mounted
        if (isActive) {
          setLoadedPlaces(userPlaces);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching places:', err);
        if (isActive) {
          setError(err.message || 'Failed to fetch places. Please try again.');
          setIsLoading(false);
        }
      }
    };

    fetchPlaces();

    // Cleanup function
    return () => {
      isActive = false;
    };
  }, [urlUserId, auth.userId]); // Dependencies remain the same

  // Show loading state only if we're loading AND have a valid userID
  if (isLoading && (urlUserId || auth.userId)) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  // Show error if we have one
  if (error) {
    return (
      <div className="center">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Show empty state if we have no places AND have a valid userID
  if (!isLoading && loadedPlaces.length === 0 && (urlUserId || auth.userId)) {
    return (
      <div className="place-list center">
        <h2>No places found. Maybe create one?</h2>
      </div>
    );
  }

  return <Placelist items={loadedPlaces} />;
};

export default UserPlaces;