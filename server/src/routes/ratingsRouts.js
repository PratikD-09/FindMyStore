import express from "express";
import {
  createRating,
  getAllRatings,
  getRatingById,
  getRatingsByStoreId,
  getRatingsByUserId,
  updateRatingById,
  deleteRatingById
} from "../controllers/ratingsController.js";

const router = express.Router();

// CREATE RATING
router.post("/ratings", createRating);

// GET ALL RATINGS
router.get("/ratings", getAllRatings);

// GET RATING BY ID
router.get("/ratings/:id", getRatingById);

// GET RATINGS FOR A STORE
router.get("/ratings/store/:store_id", getRatingsByStoreId);

// GET RATINGS BY A USER
router.get("/ratings/user/:user_id", getRatingsByUserId);

// UPDATE RATING
router.put("/ratings/:id", updateRatingById);

// DELETE RATING
router.delete("/ratings/:id", deleteRatingById);

export default router;
