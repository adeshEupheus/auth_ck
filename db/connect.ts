import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const client = new MongoClient(process.env.MONGO_URI as string);
const dbName = "Test";
const db = client.db(dbName);

export default db;
