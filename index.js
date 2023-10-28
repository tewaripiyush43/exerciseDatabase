import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Express from "express";
dotenv.config();
import axios from "axios";
import Exercise from "./models/Exercise.js";
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB", "updating data");
  setTimeout(updateData, 10 * 1000);
});

const app = Express();

const options = {
  method: "GET",
  url: "https://exercisedb.p.rapidapi.com/exercises",
  params: { limit: "9999" },
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

app.get("/fetch", async (req, res) => {
  const data = await fetchData();
  res.send(data);
});

app.put("/update", async (req, res) => {
  const data = await updateData();
  res.send(data);
});

app.get("/ping", async (req, res) => {
  res.send("pong");
});

async function fetchData() {
  try {
    const response = await axios.request(options);
    const data = response.data;
    const exercises = data.map((exercise) => {
      return {
        bodyPart: exercise["bodyPart"] || "",
        equipment: exercise["equipment"] || "",
        gifUrl: exercise["gifUrl"] || "",
        id: exercise["id"] || "",
        name: exercise["name"] || "",
        target: exercise["target"] || "",
        secondaryMuscles: exercise["secondaryMuscles"] || [],
        instructions: exercise["instructions"] || [],
      };
    });

    await Exercise.insertMany(exercises);
    return exercises;
  } catch (err) {
    console.log(err);
  }
}

async function updateData() {
  try {
    const response = await axios.request(options);
    const data = response.data;

    const updates = data.map((exercise) => ({
      updateOne: {
        filter: { id: exercise["id"] },
        update: { $set: { gifUrl: exercise["gifUrl"] } },
      },
    }));

    await Exercise.bulkWrite(updates);
    console.log("Updated data");
    return data;
  } catch (err) {
    console.log(err);
  }
}

// updateData();
// fetchData();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
