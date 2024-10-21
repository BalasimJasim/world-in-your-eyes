import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { getPlaceById, updatePlace } from "../../shared/api/places-api";


const UpdatePlace = () => {
  const [isLoading,setIsLoading]= useState(true)
  const [error, setError] = useState(null);
  const { userId, placeId } = useParams();
  const navigate = useNavigate();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );


  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const place = await getPlaceById(placeId);
        setFormData(
          {
            title: { value: place.title, isValid: true },
            description: { value: place.description, isValid: true },
          },
          true
        );
      } catch (err) {
        setError("Could not fetch place data. Please try again.");
      }
      setIsLoading(false);
    };
    
    fetchPlace();
  }, [placeId, setFormData]);



  const formUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatePlace(placeId, {
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      });
     navigate(`/${userId}/places`); 
    } catch (err) {
      console.error("Error in formUpdateSubmitHandler:", err);
    setError(err.response?.data?.message || "Updating the place failed. Please try again.");
    }
  };

  

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="center">
        <Card>
          <h2>{error}</h2>
        </Card>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={formUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please enter a valid title"
        onInput={inputHandler}
        intialValue={formState.inputs.title.value}
        intialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="please enter a valid description (min. 5 characters)"
        onInput={inputHandler}
        intialValue={formState.inputs.description.value}
        intialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
