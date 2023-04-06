import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  id: Number,
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  phone: String,
});

export default mongoose.model("Users", userSchema);
