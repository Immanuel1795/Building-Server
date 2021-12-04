import express from "express";
const app = express();
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const PORT = 9000;

// const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;

const movieData = [
  {
    id: "100",
    name: "Iron man 2",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
    rating: 7,
    summary:
      "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    trailer: "https://www.youtube.com/embed/wKtcmiifycU",
    language: "english",
  },
  {
    id: "101",
    name: "No Country for Old Men",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    rating: 8.1,
    summary:
      "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    trailer: "https://www.youtube.com/embed/38A__WT3-o0",
    language: "english",
  },
  {
    id: "102",
    name: "Jai Bhim",
    poster:
      "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    summary:
      "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    rating: 8.8,
    trailer: "https://www.youtube.com/embed/nnXpbTFrqXA",
    language: "tamil",
  },
  {
    id: "103",
    name: "The Avengers",
    rating: 8,
    summary:
      "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
    poster:
      "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    trailer: "https://www.youtube.com/embed/eOrNdBpGMv8",
    language: "english",
  },
  {
    id: "104",
    name: "Interstellar",
    poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
    rating: 8.6,
    summary:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
    language: "english",
  },
  {
    id: "105",
    name: "Baahubali",
    poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
    rating: 8,
    summary:
      "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    trailer: "https://www.youtube.com/embed/sOEg_YZQsTI",
    language: "tamil",
  },
  {
    id: "106",
    name: "Ratatouille",
    poster:
      "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
    rating: 8,
    summary:
      "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w",
    language: "english",
  },
];

//to parse all the req as json
//solution is by using middleware
app.use(express.json()); //parse body to json

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongo db connected");

  return client;
}

createConnection();

app.get("/", (request, response) => {
  response.send("hello world!!!");
});

// app.get('/movies', (request, response) => {
//     const filters = request.query;

//     const filteredUsers = movieData.filter(user => {
//       let isValid = true;
//       for (const key in filters) {
//         console.log(isValid ,key, user[key], filters[key]);
//         isValid = isValid && user[key] == filters[key];
//       }
//       console.log(isValid)
//       return isValid;
//     });

//     response.send(filteredUsers);
//   });

app.get("/movies", async (request, response) => {
  const filter = request.query;

  if (filter.rating) {
    filter.rating = +filter.rating;
  }

  const client = await createConnection();

  const filterMovies = await client
    .db("learnMonge")
    .collection("movies")
    .find(filter)
    .toArray();

  response.send(filterMovies);
});

app.get("/movies/:id", async (request, response) => {
  const { id } = request.params;

  const notFound = { message: "No matching movie" };

  const client = await createConnection();

  const movie = await client
    .db("learnMonge")
    .collection("movies")
    .findOne({ id: id });
  console.log(movie);

  // response.send(movieDetail ? movieDetail : notFound);
  movie ? response.send(movie) : response.status(404).send(notFound);
});

app.post("/movies", async (request, response) => {
  //db.collection.insertMany(data);

  const data = request.body;

  const client = await createConnection();

  const result = await client
    .db("learnMonge")
    .collection("movies")
    .insertMany(data);

  response.send(result);
});

app.put("/movies/:id", async (request, response) => {
  const { id } = request.params;

  const data = request.body;
  console.log(data, id);

  const client = await createConnection();

  //String.valueOf() to conver to string

  const result = await client
    .db("learnMonge")
    .collection("movies")
    .updateOne({ id: String.valueOf(id) }, { $set: data }, { upsert: true });

  response.send(result);
});

app.delete("/movies/:id", async (request, response) => {
  const { id } = request.params;

  const data = request.body;
  console.log(data, id);

  const client = await createConnection();

  //String.valueOf() to conver to string

  const result = await client
    .db("learnMonge")
    .collection("movies")
    .deleteOne({ id: id });

  response.send(result);
});

app.listen(PORT, () => console.log("app started"));


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
____________Validation with yup_________________________

import express from "express";
import bcrypt from "bcrypt";
import { createUser, getUserByName } from "../helper.js";
const router = express.Router();
import {userSchema, validate} from "../validation.js"

router.route("/signup").post(validate(userSchema), async (request, response) => {
  const {username, password} = request.body;

  const hashedPassword = await genPassword(password); 
  console.log(hashedPassword)

  const isUserExist  = await getUserByName(username);

  if(isUserExist){
    response.send({message: "Users already exist"});
    return
  }

  const result = await createUser({username, password: hashedPassword})
  response.send(result);
  });


export const usersRouter = router;

async function genPassword(password) {
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

import yup from "yup";

const userSchema = yup.object({
    username: yup.string().required('Please Enter your username'),
    password: yup.string().matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ).required('Please Enter your password'),
 });

 const validate = (schema) => async (request, response, next) => {
    try {
      await schema.validate(request.body);
      return next();
    } catch (err) {
      return response.status(500).json(err);
    }
  };

  export {
    userSchema,
    validate
  
  };

  _______________________________________________________

  // router
  // .route("/")
  // .get(async (request, response) => {
  // const filter = request.query;

  // if (filter.rating) {
  //   filter.rating = +filter.rating;
  // }

  // const filterMovies = await getMovies(filter);

  // response.send(filterMovies);
  // })

  
