import mongoose from "mongoose";
const { Schema } = mongoose;

const PersonRoleSchema = new Schema({
  id: Number,
  personroletype: String,
  personid: Number,
});

export default mongoose.model("personroles", PersonRoleSchema);
