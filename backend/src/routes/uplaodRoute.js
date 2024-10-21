import express from 'express';
import cloudinary from 'cloudinary';
import upload from '../middlewares/uploadMiddleware';

const router = express.Router();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: 'places',
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image' });
  }
});

export default router;
