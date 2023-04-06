import mongoose from "mongoose";
const { Schema } = mongoose;

const schoolacademicyearSchema = new Schema({
  id: Number,
  schoolid: Number,
  academicyearid: Number,
  calendarid: Number,
});

export default mongoose.model("schoolacademicyears", schoolacademicyearSchema);
