import express from "express";
const app = express();
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { movieRouter } from "./routes/movies.js";
dotenv.config();

const PORT = process.env.PORT || 9000;

const MONGO_URL = process.env.MONGO_URL;



app.use(express.json());

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongo db connected");

  return client;
}

export const client = await createConnection();

app.get("/", (request, response) => {
  response.send("hello world!!!");
});

app.use("/movies", movieRouter);


app.listen(PORT, () => console.log("app started"));



