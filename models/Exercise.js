import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  bodyPart: {
    type: String,
    require: true,
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
  secondaryMuscles: [
    {
      type: String,
      required: true,
    },
  ],
  instructions: [
    {
      type: String,
      required: true,
    },
  ],
});

const Exercise = mongoose.model("exercisev2", exerciseSchema);
export default Exercise;
