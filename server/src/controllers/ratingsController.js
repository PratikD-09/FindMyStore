import { createRatingService, deleteRatingByIdService, getAllRatingsService, getRatingByIdService, getRatingsByStoreIdService, getRatingsByUserIdService, updateRatingByIdService } from "../models/ratingsModel.js";


// CREATE RATING
export const createRating = async (req, res, next) => {
    const { user_id, store_id, rating, description } = req.body;

    if (!user_id || !store_id || !rating) {
        return res.status(400).json({
            success: false,
            message: "user_id, store_id, and rating are required",
        });
    }

    try {
        const newRating = await createRatingService(
            user_id,
            store_id,
            rating,
            description
        );

        return res.status(201).json({
            success: true,
            message: "Rating created successfully",
            data: newRating,
        });

    } catch (error) {
        next(error);
    }
};


// GET ALL RATINGS
export const getAllRatings = async (req, res, next) => {
    try {
        const ratings = await getAllRatingsService();

        res.status(200).json({
            success: true,
            message: "Ratings retrieved successfully",
            data: ratings,
        });
    } catch (error) {
        next(error);
    }
};


// GET RATING BY ID
export const getRatingById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const rating = await getRatingByIdService(id);

        if (!rating) {
            return res.status(404).json({
                success: false,
                message: "Rating not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Rating retrieved successfully",
            data: rating,
        });

    } catch (error) {
        next(error);
    }
};


// GET RATINGS FOR A STORE
export const getRatingsByStoreId = async (req, res, next) => {
    const { store_id } = req.params;

    try {
        const ratings = await getRatingsByStoreIdService(store_id);

        res.status(200).json({
            success: true,
            message: "Store ratings retrieved successfully",
            data: ratings,
        });

    } catch (error) {
        next(error);
    }
};


// GET RATINGS BY A USER
export const getRatingsByUserId = async (req, res, next) => {
  const { user_id } = req.params; // 🔥 must match route param name

  try {
    const ratings = await getRatingsByUserIdService(user_id);
    res.status(200).json({
      success: true,
      data: ratings,
    });
  } catch (error) {
    next(error);
  }
};




// UPDATE RATING
export const updateRatingById = async (req, res, next) => {
    const { id } = req.params;
    const { rating, description } = req.body;

    try {
        const updatedRating = await updateRatingByIdService(
            id,
            rating,
            description
        );

        if (!updatedRating) {
            return res.status(404).json({
                success: false,
                message: "Rating not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Rating updated successfully",
            data: updatedRating,
        });

    } catch (error) {
        next(error);
    }
};


// DELETE RATING
export const deleteRatingById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedRating = await deleteRatingByIdService(id);

        if (!deletedRating) {
            return res.status(404).json({
                success: false,
                message: "Rating not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Rating deleted successfully",
            data: deletedRating,
        });

    } catch (error) {
        next(error);
    }
};
