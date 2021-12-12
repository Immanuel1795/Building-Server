import express from "express";
import { auth } from "../middleware/auth.js";


const router = express.Router();
import {
 getRecipees,
getRecipeesById,
  createRecipees,
} from "../helper.js";




router
  .route("/")
  .get(auth, async (request, response) => {
  const filter = request.query;

  if (filter.rating) {
    filter.rating = +filter.rating;
  }

  const filterRecipees = await getRecipees(filter);

  response.send(filterRecipees);
  })
  .post(async (request, response) => {
  const data = request.body;

  const result = await createRecipees(data);

  response.send(result);
  });



router
  .route("/:id")
  .get(async (request, response) => {
    const { id } = request.params;
  
    const notFound = { message: "No matching recipee" };
  
    const recipee = await getRecipeesById(id);
    console.log(id);
  
    recipee ? response.send(recipee) : response.status(404).send(notFound);
  })
  

export const recipeRouter = router;
