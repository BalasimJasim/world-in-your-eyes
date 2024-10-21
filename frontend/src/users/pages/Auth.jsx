import "./Auth.css";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login, singup } from "../../shared/api/auth-api";

export const Auth = () => {
  const Navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [formState, inputHandler, setFormData] = useForm(
    {
      
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  
  const switchHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prev) => !prev);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    setIsLoading(true);

    if (isLoginMode) {
      try {
        const responseData = await login(
          formState.inputs.email.value,
          formState.inputs.password.value
        );
        console.log('Login response:', responseData);
        auth.login(responseData.user.userId, responseData.token);
        Navigate('/');
      } catch (err) {
        console.error('Login error:', err);
        setError(err.message || 'Something went wrong, please try again.');
      }
    } else {
      try {
        const responseData = await singup(
          formState.inputs.name.value,
          formState.inputs.email.value,
          formState.inputs.password.value
        );

        console.log('Signup response:', responseData);
        auth.singup(responseData.user.userId, responseData.token);
        Navigate('/');
      } catch (err) {
        console.error('Signup error:', err);
        setError(err.message || 'Something went wrong, please try again.');
      }
    }

    setIsLoading(false);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <Card className="authentication">
        <h2>Login Required!</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              label="Name"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email!"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid paswword with 5 characters at least!"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SINGUP"}
          </Button>
        </form>
        <Button inverse onClick={switchHandler}>
          {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
};
