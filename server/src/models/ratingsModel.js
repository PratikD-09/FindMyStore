import pool from "../config/db.js";

// CREATE RATING
export const createRatingService = async (user_id, store_id, rating, description) => {
  const result = await pool.query(
    `INSERT INTO ratings 
      (user_id, store_id, rating, description)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [user_id, store_id, rating, description]
  );

  return result.rows[0];
};

// GET ALL RATINGS
export const getAllRatingsService = async () => {
  const result = await pool.query(
    `SELECT r.*, u.username, u.email 
     FROM ratings r
     LEFT JOIN users u ON r.user_id = u.username
     ORDER BY r.created_at DESC`
  );
  return result.rows;
};

// GET RATING BY ID
export const getRatingByIdService = async (id) => {
  const result = await pool.query(
    `SELECT r.*, u.username 
     FROM ratings r
     LEFT JOIN users u ON r.user_id = u.username
     WHERE r.id = $1`,
    [id]
  );

  return result.rows[0];
};

// GET RATINGS FOR A STORE
export const getRatingsByStoreIdService = async (store_id) => {
//   console.log("store_id received in service =", store_id, "type =", typeof store_id);

  const result = await pool.query(
    `SELECT r.*, u.username 
     FROM ratings r
     LEFT JOIN users u ON r.user_id = u.username
     WHERE r.store_id = $1
     ORDER BY r.created_at DESC`,
    [store_id]  // already INT in DB
  );

  return result.rows;
};

// GET RATINGS GIVEN BY A USER (username)
export const getRatingsByUserIdService = async (username) => {
  const result = await pool.query(
    `SELECT r.*, s.name AS store_name 
     FROM ratings r
     LEFT JOIN stores s ON r.store_id = s.id
     WHERE r.user_id = $1
     ORDER BY r.created_at DESC`,
    [username] // username string
  );

  return result.rows;
};


// UPDATE RATING
export const updateRatingByIdService = async (id, rating, description) => {
  const result = await pool.query(
    `UPDATE ratings 
     SET rating = $1,
         description = $2
     WHERE id = $3
     RETURNING *`,
    [rating, description, id]
  );

  return result.rows[0];
};

// DELETE RATING
export const deleteRatingByIdService = async (id) => {
  const result = await pool.query(
    "DELETE FROM ratings WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
