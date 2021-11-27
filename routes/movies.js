import express from "express";

const router = express.Router();
import {
  getMoviesById,
  getMovies,
  updateMovieByID,
  deleteMovieById,
  createMovies,
} from "../helper.js";



router.get("/", async (request, response) => {
  const filter = request.query;

  if (filter.rating) {
    filter.rating = +filter.rating;
  }

  const filterMovies = await getMovies(filter);

  response.send(filterMovies);
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;

  const notFound = { message: "No matching movie" };

  const movie = await getMoviesById(id);
  console.log(movie);

  movie ? response.send(movie) : response.status(404).send(notFound);
});

router.post("/", async (request, response) => {
  const data = request.body;

  const result = await createMovies(data);

  response.send(result);
});

router.put("/:id", async (request, response) => {
  const { id } = request.params;

  const data = request.body;
  console.log(data, id);

  const result = await updateMovieByID(id, data);

  response.send(result);
});

router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const data = request.body;
  const result = await deleteMovieById(id);

  response.send(result);
});

export const movieRouter = router;
