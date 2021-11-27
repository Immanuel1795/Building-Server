 import {client} from "./index.js"
 
 async function getMoviesById(id) {
  return await client.db("learnMonge").collection("movies").findOne({ _id: id });
}
 async function createMovies(data) {
  return await client.db("learnMonge").collection("movies").insertMany(data);
}
 async function deleteMovieById(id) {
  return await client
    .db("learnMonge")
    .collection("movies")
    .deleteOne({ mid: id });
}
 async function updateMovieByID(id, data) {
   console.log(id, data)
  return await client
    .db("learnMonge")
    .collection("movies")
    .updateOne({ mid: id }, { $set: data }, { upsert: true });
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
