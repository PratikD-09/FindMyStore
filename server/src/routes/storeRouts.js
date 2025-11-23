import express from "express";
import {
  createStore,
  getAllStores,
  getStoreById,
  updateStoreById,
  deleteStoreById,
  getStoreByOwnerId
} from "../controllers/storeController.js";

const router = express.Router();


// CREATE STORE
router.post('/stores', createStore);

// GET ALL STORES
router.get('/stores', getAllStores);


// router.get('/stores/owner/:id', getStoreByOwnerId);
router.get("/owner/:owner_id", getStoreByOwnerId);

// GET STORE BY ID
router.get('/stores/:id', getStoreById);

// UPDATE STORE
router.put('/stores/:id', updateStoreById);

// DELETE STORE
router.delete('/stores/:id', deleteStoreById);


export default router;
