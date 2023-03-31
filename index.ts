import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import AuthRouter from "./router/Auth";
dotenv.config();
import db from "./db/connect";

const client = new MongoClient(process.env.MONGO_URI as string);

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", async (req, res) => {
  const coll = db.collection("Users");
  const data = await coll
    .find({
      firstname: "Ginelle",
    })
    .toArray();
  console.log(data);
  res.status(200).send("testing");
});

app.use("/api_v1", AuthRouter);

const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    await client.connect();
    console.log("Connected successfully to db");
    app.listen(PORT, () => {
      console.log("server is listing on " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
