import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersCount,
  getUserPlaces,
} from "../controllers/userCtrl.js";
import verifyingUserToken from "../middlewares/verifyingUserToken.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:userID", getUserById);
userRouter.get("/count", getUsersCount);
userRouter.get("/:userID/places", getUserPlaces);

// Routes to update and delete a user - authentication required
userRouter.put("/:userID", verifyingUserToken, updateUser);
userRouter.delete("/:userID", verifyingUserToken, deleteUser);

export default userRouter;
