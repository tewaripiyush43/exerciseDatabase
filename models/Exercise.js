import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  bodyPart: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  equipment: {
    type: String,
    require: true,
  },
  gifUrl: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  target: {
    type: String,
    require: true,
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;
