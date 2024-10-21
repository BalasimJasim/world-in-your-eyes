import express from "express";
import { loginUser, singup } from "../controllers/authCtrl.js";
import { verifyUserMiddleware } from "../middlewares/emailVerification.js";
import { userValidationRules, validate } from "../middlewares/userValidation.js";


const authRoute = express.Router();

// Registration route
authRoute.post("/signup",userValidationRules(), validate, singup);

// Email verification route
authRoute.get("/verify/:token", verifyUserMiddleware);

// Login route
authRoute.post("/login", userValidationRules(), validate, loginUser);

export default authRoute;
