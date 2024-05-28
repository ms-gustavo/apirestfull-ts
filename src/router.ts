import { Router, Request, Response } from "express";
import {
  createMovie,
  deleteMovieById,
  findMovieById,
  getAllMovies,
  updateMovie,
} from "./controllers/movieControllers";
import { validate } from "./middlewares/validation";
import { movieCreateValidation } from "./middlewares/movieValidation";

const router = Router();

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send(`API Working`);
  })
  .post("/movie", movieCreateValidation(), validate, createMovie)
  .get("/movie/:id", findMovieById)
  .get("/movie", getAllMovies)
  .delete("/movie/:id", deleteMovieById)
  .patch("/movie/:id", movieCreateValidation(), validate, updateMovie);
