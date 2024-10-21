import React, { useEffect, useState } from 'react';
import PlaceItems from './PlaceItems';
import Card from "../../shared/components/UIElements/Card";
import Button from '../../shared/components/FormElements/Button';
import { getPlaces } from '../../shared/api/places-api';
import "./PlaceList.css";

const PlaceList = () => {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const data = await getPlaces();
                setPlaces(data);
            } catch (error) {
                console.error("Error fetching places:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlaces();
    }, []);

   
    const handleDeletePlace = (placeId) => {
        setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== placeId));
    };

    if (isLoading) {
        return <div className="center"><p>Loading...</p></div>;
    }

    if (places.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button to="/places/new">Share Place</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className='place-list'>
            {places.map(place => (
                <PlaceItems
                    key={place._id}
                    id={place._id}
                    image={place.imageUrl}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                    onDeletePlace={handleDeletePlace} 
                />
            ))}
        </ul>
    );
};

export default PlaceList;
