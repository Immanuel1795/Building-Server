 import {client} from "./index.js"
 
 async function getMoviesById(id) {
  return await client.db("learnMonge").collection("movies").findOne({ id: id });
}
 async function createMovies(data) {
  return await client.db("learnMonge").collection("movies").insertMany(data);
}
 async function deleteMovieById(id) {
  return await client
    .db("learnMonge")
    .collection("movies")
    .deleteOne({ id: id });
}
 async function updateMovieByID(id, data) {
  return await client
    .db("learnMonge")
    .collection("movies")
    .updateOne({ id: String.valueOf(id) }, { $set: data }, { upsert: true });
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
