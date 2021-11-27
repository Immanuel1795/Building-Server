 import {client} from "./index.js"
 import mongodb from 'mongodb';
 
 async function getMoviesById(id) {
  return await client.db("learnMonge").collection("movies").findOne({ _id: mongodb.ObjectId(id) });
}
 async function createMovies(data) {
  return await client.db("learnMonge").collection("movies").insertMany(data);
}
 async function deleteMovieById(id) {
  return await client
    .db("learnMonge")
    .collection("movies")
    .deleteOne({ _id: mongodb.ObjectId(id) });
}
 async function updateMovieByID(id, data) {
   console.log(id, data)
  return await client
    .db("learnMonge")
    .collection("movies")
    .updateOne({ _id: mongodb.ObjectId(id) }, { $set: data }, { upsert: true });
}

 async function getMovies(filter) {
  return await client
    .db("learnMonge")
    .collection("movies")
    .find(filter)
    .toArray();
}


export {
  getMovies,
  createMovies,
  updateMovieByID,
  deleteMovieById,
  getMoviesById

};
