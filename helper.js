 import {client} from "./index.js"
 import {ObjectId} from 'mongodb';
 
 async function getMoviesById(id) {
  return await client.db("learnMonge").collection("movies").findOne({ _id: ObjectId(id) });
}
 async function createMovies(data) {
  return await client.db("learnMonge").collection("movies").insertMany(data);
}
 async function deleteMovieById(id) {
  return await client
    .db("learnMonge")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}
 async function updateMovieByID(id, data) {
   console.log(id, data)
  return await client
    .db("learnMonge")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
}

 async function getMovies(filter) {
  return await client
    .db("learnMonge")
    .collection("movies")
    .find(filter)
    .toArray();
}

async function createUser(data) {
  return await client.db("learnMonge").collection("users").insertOne(data);
}

async function getUserByName(username) {
  return await client.db("learnMonge").collection("users").findOne({username: username });
}


export {
  getMovies,
  createMovies,
  updateMovieByID,
  deleteMovieById,
  getMoviesById,
  createUser,
  getUserByName

};
