import { Router, Request, Response } from "express";
import { createMovie, findMovieById } from "./controllers/movieControllers";
import { validate } from "./middlewares/validation";
import { movieCreateValidation } from "./middlewares/movieValidation";

const router = Router();

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send(`API Working`);
  })
  .post("/movie", movieCreateValidation(), validate, createMovie)
  .get("/movie/:id", findMovieById);
