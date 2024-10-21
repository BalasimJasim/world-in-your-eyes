import  { Schema ,model} from "mongoose";

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  token: {
    type: "string",
    require: true,
  },
}, 
{timestamps:true}
);

const VerificationToken = model("VerificationToken", tokenSchema)
export default VerificationToken