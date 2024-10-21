
import express from "express";
import cloudinary from "../utils/cloudinary.js"
import {
  createPlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
} from "../controllers/placeCtrl.js";
import verifyingUserToken from "../middlewares/verifyingUserToken.js";
import upload from "../middlewares/uploadMiddleware.js";

const placeRouter = express.Router();

// Route to get all places (no auth required)
placeRouter.get("/", getAllPlaces);

// Route to get a place by ID (no auth required)
placeRouter.get("/:placeID", getPlaceById);

// Route to create a new place (auth required)
placeRouter.post("/", verifyingUserToken, createPlace);

// Route to update a place by ID (auth required)
placeRouter.put("/:placeID", verifyingUserToken, updatePlace);

// Route to delete a place by ID (auth required)
placeRouter.delete("/:placeID", verifyingUserToken, deletePlace);



placeRouter.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: 'places',
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

export default placeRouter;
