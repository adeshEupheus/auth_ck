import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRouter from "./router/Auth";
import SchoolRouter from "./router/School";
import { auth } from "./middleware/Auth";
import os from "os";
import cluster from "cluster";
dotenv.config();

const numCpu = os.cpus().length;

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).send("testing");
});

app.use("/api_v1/auth", AuthRouter);
app.use("/api_v1/school", auth, SchoolRouter);

const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected successfully to dbs");

    app.listen(PORT, () => {
      console.log(`server ${process.pid} is listing on ` + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

if (cluster.isPrimary) {
  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  main();
}
