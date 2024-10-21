import { Schema, model } from "mongoose";

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const Place =model('Place', placeSchema);
