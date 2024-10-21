import { Place } from "../models/placeModel.js";
import { User } from "../models/usersModel.js";



export const getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };


export const getUserById = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userID);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ error: "user not found!" });
      }
    } catch (error) {
      next(error);
    }
  };

  export const updateUser = async (req, res, next) => {
    try {
      if (req.user._id !== req.params.userID) {
        return res.status(403).json({ message: "Unauthorized request" });
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userID,
        {
          $set: {
            email: req.body.email,
            password: req.body.password,
          },
        },
        { new: true }
      ).select("-password");
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  export const deleteUser = async (req, res, next) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userID);
      if (deletedUser) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  export const getUsersCount = async (req, res, next) => {
    try {
      const count = await User.countDocuments();
      res.status(200).json({ message: count });
      console.log("Users on our App:", count);
    } catch (error) {
      next(error);
    }
  };

  
export const getUserPlaces = async (req, res) => {
    const userId = req.params.userID;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const places = await Place.find({ creator: userId });
      res.json(places);
    } catch (error) {
      console.error('Error fetching user places:', error);
      res.status(500).json({ message: 'Error fetching user places' });
    }
  };