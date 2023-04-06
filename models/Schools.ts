import mongoose from "mongoose";
const { Schema } = mongoose;

const SchoolSchema = new Schema({
  id: Number,
  code: String,
  name: String,
  email: String,
  addressid: Number,
});

export default mongoose.model("schools", SchoolSchema);
