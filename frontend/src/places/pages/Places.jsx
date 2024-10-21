import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/Util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { createPlace } from "../../shared/api/places-api";
import { AuthContext } from "../../shared/context/AuthContext";
import "./Place.css";

export const Places = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [formState, inputHandler] = useForm(
        {
            title: { value: "", isValid: false },
            description: { value: "", isValid: false },
            address: { value: "", isValid: false },
        },
        false
    );

    const placeSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const placeData = new FormData();
            placeData.append('title', formState.inputs.title.value);
            placeData.append('description', formState.inputs.description.value);
            placeData.append('address', formState.inputs.address.value);
            placeData.append('creator', auth.userId);
            if (imageFile) {
                placeData.append('image', imageFile);
            }
            
            console.log('Form Data:');
            for (let [key, value] of placeData.entries()) {
                console.log(key, value);
            }

            const response = await createPlace(placeData, auth.token);             
            console.log("Place created successfully!", response);
            navigate("/");
        } catch (error) {
            console.error("Error creating place:", error.response ? error.response.data : error.message);
        }
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)"
                onInput={inputHandler}
            />
            <Input
                id="address"
                element="input"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address"
                onInput={inputHandler}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};