import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    isVerified: {
        type: Boolean,
        default: false,
      },
    places: [{ type: Schema.Types.ObjectId,required: true, ref: 'Place' }]
  });

export const User =model('User', userSchema);
