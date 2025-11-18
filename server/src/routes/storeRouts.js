import express from "express";
import {
  createStore,
  getAllStores,
  getStoreById,
  updateStoreById,
  deleteStoreById
} from "../controllers/storeController.js";

const router = express.Router();


// CREATE STORE
router.post('/stores', createStore);

// GET ALL STORES
router.get('/stores', getAllStores);

// GET STORE BY ID
router.get('/stores/:id', getStoreById);

// UPDATE STORE
router.put('/stores/:id', updateStoreById);

// DELETE STORE
router.delete('/stores/:id', deleteStoreById);


export default router;
