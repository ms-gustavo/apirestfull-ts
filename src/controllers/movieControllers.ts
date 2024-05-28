import { Request, Response } from "express";
import { MovieModel } from "../models/Movie";
import Logger from "../../config/logger";
import mongoose from "mongoose";
import i18n from "i18next";

export async function createMovie(req: Request, res: Response) {
  try {
    const data = req.body;
    const movie = await MovieModel.create(data);
    return res
      .status(201)
      .json({
        movie: movie,
        success: i18n.t("success.movie_created_successfully"),
      });
  } catch (error: any) {
    Logger.error(`System error: ${error.message}`);
    return res
      .status(500)
      .json({ error: i18n.t("errors.internal_server_error") });
  }
}

export async function findMovieById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error: i18n.t("errors.invalid_id_format") });
    }
    const movie = await MovieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ error: i18n.t("errors.movie_not_found") });
    }
    return res.status(200).json(movie);
  } catch (error: any) {
    Logger.error(`System error: ${error.message}`);
    return res
      .status(500)
      .json({ error: i18n.t("errors.internal_server_error") });
  }
}

export async function getAllMovies(req: Request, res: Response) {
  try {
    const movies = await MovieModel.find();
    if (movies.length < 1) {
      return res
        .status(404)
        .json({ error: i18n.t("errors.no_movies_registered") });
    }
    return res.status(200).json(movies);
  } catch (error: any) {
    Logger.error(`System error: ${error.message}`);
    return res
      .status(500)
      .json({ error: i18n.t("errors.internal_server_error") });
  }
}

export async function deleteMovieById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error: i18n.t("errors.invalid_id_format") });
    }

    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(404).json({ error: i18n.t("errors.movie_not_found") });
    }

    await movie.deleteOne();
    return res
      .status(200)
      .json({ success: i18n.t("success.movie_deleted_successfully") });
  } catch (error: any) {
    Logger.error(`System error: ${error.message}`);
    return res
      .status(500)
      .json({ error: i18n.t("errors.internal_server_error") });
  }
}

export async function updateMovie(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error: i18n.t("errors.invalid_id_format") });
    }

    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(404).json({ error: i18n.t("errors.movie_not_found") });
    }

    await MovieModel.updateOne({ _id: id }, data);
    return res
      .status(200)
      .json({
        data: data,
        success: i18n.t("success.movie_updated_successfully"),
      });
  } catch (error: any) {
    Logger.error(`System error: ${error.message}`);
    return res
      .status(500)
      .json({ error: i18n.t("errors.internal_server_error") });
  }
}
