import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import Exercise from "./models/Exercise.js";
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});

const options = {
  method: "GET",
  url: "https://exercisedb.p.rapidapi.com/exercises",
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

async function fetchData() {
  try {
    const response = await axios.request(options);
    const data = response.data;
    for (var i = 0; i < data?.length; i++) {
      const exercise = new Exercise({
        bodyPart: data[i]["bodyPart"] || "",
        description: data[i]["description"] || "",
        equipment: data[i]["equpment"] || "",
        gifUrl: data[i]["gifUrl"] || "",
        id: data[i]["id"] || "",
        name: data[i]["name"] || "",
        target: data[i]["target"] || "",
      });
      // console.log(exercise);
      exercise.save();
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateData() {
  try {
    const response = await axios.request(options);
    const data = response.data;

    for (var i = 0; i < data?.length; i++) {
      await Exercise.updateOne(
        { id: data[i]["id"] },
        {
          //only upate the gifUrl field
          $set: { gifUrl: data[i]["gifUrl"] },
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

updateData();
// process.exit();
// fetchData();
