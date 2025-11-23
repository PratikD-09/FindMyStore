import pool from "../config/db.js";

// CREATE STORE
export const createStoreService = async (
  owner_id,
  name,
  address,
  category,
  description,
  phone
) => {
  const result = await pool.query(
    `INSERT INTO stores 
      (owner_id, name, address, category, description, phone)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [owner_id, name, address, category, description, phone]
  );

  return result.rows[0];
};

export const findUserById = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [user_id]
  );

  return result.rows[0];
};



export const findStoreByOwner = async (owner_id) => {
  const result = await pool.query(
    "SELECT * FROM stores WHERE owner_id = $1 LIMIT 1",
    [owner_id]
  );
  return result.rows[0]; // returns store or undefined
};



// GET ALL STORES
export const getAllStoresService = async () => {
  const result = await pool.query(
    `SELECT 
        s.*, 
        COALESCE(AVG(r.rating), 0) AS rating
     FROM stores s
     LEFT JOIN ratings r ON r.store_id = s.id
     GROUP BY s.id
     ORDER BY s.created_at DESC`
  );
  return result.rows;
};



// GET STORE BY ID
export const getStoreByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM stores WHERE id = $1", [id]);
  return result.rows[0];
};


// UPDATE STORE
export const updateStoreByIdService = async (
  id,
  name,
  address,
  category,
  description,
  phone
) => {
  const result = await pool.query(
    `UPDATE stores 
     SET name = $1,
         address = $2,
         category = $3,
         description = $4,
         phone = $5
     WHERE id = $6
     RETURNING *`,
    [name, address, category, description, phone, id]
  );

  return result.rows[0];
};


// DELETE STORE
export const deleteStoreByIdService = async (id) => {
  const result = await pool.query(
    "DELETE FROM stores WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
