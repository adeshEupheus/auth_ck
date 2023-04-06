import mongoose from "mongoose";
const { Schema } = mongoose;

const schoolCoordinatorRoles = new Schema({
  id: Number,
  coordinatorid: Number,
  schoolid: Number,
});

export default mongoose.model("schoolcoordinatorroles", schoolCoordinatorRoles);
