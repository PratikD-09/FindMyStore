import {
  createStoreService,
  getAllStoresService,
  getStoreByIdService,
  updateStoreByIdService,
  deleteStoreByIdService,
  findStoreByOwner,
  findUserById
} from "../models/storeModel.js";


// CREATE STORE

export const createStore = async (req, res, next) => {
  const { owner_id, name, address, category, description, phone } = req.body;

  if (!owner_id || !name) {
    return res.status(400).json({
      success: false,
      message: "Owner ID and Name are required",
    });
  }

  try {
    // ⭐ STEP 1: Check if user exists
    const user = await findUserById(owner_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ⭐ STEP 2: Check if user has role = 'store'
    if (user.role !== 'store') {
      return res.status(403).json({
        success: false,
        message: "Only users with role 'store' can create a store",
      });
    }

    // ⭐ STEP 3: Check if owner already has a store
    const existingStore = await findStoreByOwner(owner_id);

    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: "This owner already has a store. Only one store allowed per owner.",
      });
    }

    // ⭐ STEP 4: Create store
    const newStore = await createStoreService(
      owner_id,
      name,
      address,
      category,
      description,
      phone
    );

    return res.status(201).json({
      success: true,
      message: "Store created successfully",
      data: newStore,
    });

  } catch (error) {
    next(error);
  }
};

export const getStoreByOwnerId = async (req, res, next) => {
  const { owner_id } = req.params; // assuming route uses /store/owner/:owner_id

  if (!owner_id) {
    return res.status(400).json({
      success: false,
      message: "Owner ID is required",
    });
  }

  try {
    // Service call
    const store = await findStoreByOwner(owner_id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "No store found for this owner",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Store fetched successfully",
      data: store,
    });

  } catch (error) {
    next(error);
  }
};





// GET ALL STORES
export const getAllStores = async (req, res, next) => {
  try {
    const stores = await getAllStoresService();

    res.status(200).json({
      success: true,
      message: "Stores retrieved successfully",
      data: stores,
    });
  } catch (error) {
    next(error);
  }
};

// SERVICE: Fetch store by owner_id



// GET STORE BY ID
export const getStoreById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const store = await getStoreByIdService(id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Store retrieved successfully",
      data: store,
    });
  } catch (error) {
    next(error);
  }
};


// UPDATE STORE BY ID
export const updateStoreById = async (req, res, next) => {
  const { id } = req.params;
  const { name, address, category, description, phone } = req.body;

  try {
    const updatedStore = await updateStoreByIdService(
      id,
      name,
      address,
      category,
      description,
      phone
    );

    if (!updatedStore) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Store updated successfully",
      data: updatedStore,
    });
  } catch (error) {
    next(error);
  }
};


// DELETE STORE
export const deleteStoreById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedStore = await deleteStoreByIdService(id);

    if (!deletedStore) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Store deleted successfully",
      data: deletedStore,
    });
  } catch (error) {
    next(error);
  }
};
