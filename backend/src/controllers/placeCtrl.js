import { Place } from "../models/placeModel.js";
import { User } from "../models/usersModel.js";
import cloudinary from "../utils/cloudinary.js";
import multer from 'multer';
import { Readable } from 'stream';
import sharp from 'sharp'; 

// Create a new place

const upload = multer({ storage: multer.memoryStorage() }).single('image');
export const createPlace = async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File upload error' });
    } else if (err) {
      return res.status(500).json({ message: 'Unknown error', error: err });
    }

    console.log('Received place data:', req.body);
    console.log('Received file:', req.file);

    const { title, description, address, creator } = req.body;
    let imageUrl = '';

    try {
      if (!title || !description || !address || !creator) {
        throw new Error('Missing required fields');
      }

      if (req.file) {
        // Compress the image using sharp
        const compressedImageBuffer = await sharp(req.file.buffer)
          .resize({ width: 800 }) // Adjust the width as needed
          .toFormat('jpeg', { quality: 80 }) // Adjust the quality as needed
          .toBuffer();

        const stream = Readable.from(compressedImageBuffer);
        const cloudinaryUpload = cloudinary.uploader.upload_stream(
          {
            folder: 'places',
            transformation: [
              { quality: 'auto', fetch_format: 'auto' }
            ],
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return res.status(500).json({ message: 'Image upload failed' });
            }
            imageUrl = result.secure_url;
            continueCreatingPlace();
          }
        );
        stream.pipe(cloudinaryUpload);
      } else {
        throw new Error('Image file is required');
      }

      function continueCreatingPlace() {
        const newPlace = new Place({
          title,
          description,
          imageUrl,
          address,
          location: {
            lat: 0, // You might want to use a geocoding service here
            lng: 0,
          },
          creator,
        });

        newPlace.save()
          .then(savedPlace => {
            return User.findByIdAndUpdate(creator, {
              $push: { places: savedPlace._id },
            });
          })
          .then(() => {
            res.status(201).json(newPlace);
          })
          .catch(error => {
            console.error('Error saving place or updating user:', error);
            res.status(500).json({ message: 'Failed to save place' });
          });
      }
    } catch (error) {
      console.error('Error in createPlace:', error);
      res.status(400).json({ message: error.message });
    }
  });
};

// Get all places
export const getAllPlaces = async (req, res, next) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
    console.log("places:", places)
  } catch (error) {
    next(error);
  }
};

// Get a place by ID
export const getPlaceById = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.placeID);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.status(200).json(place);
  } catch (error) {
    next(error);
  }
};

// Get places by creator's ID
export const getPlacesByCreatorId = async (req, res, next) => {
    const { creatorId } = req.params; 
  
    try {
      const places = await Place.find({ creator: creatorId }); 
      if (places.length === 0) {
        return res.status(404).json({ message: "No places found for this creator." });
      }
      res.status(200).json(places);
    } catch (error) {
      next(error);
    }
  };
  

// Update a place by ID
export const updatePlace = async (req, res, next) => {
  const { title, description, imageUrl, address, location } = req.body;

  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.placeID,
      {
        title,
        description,
        imageUrl,
        address,
        location
      },
      { new: true }
    );

    if (!updatedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json(updatedPlace);
  } catch (error) {
    next(error);
  }
};

// Delete a place by ID
export const deletePlace = async (req, res, next) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.placeID);
    if (!deletedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    next(error);
  }
};
