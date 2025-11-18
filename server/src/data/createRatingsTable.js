import pool from "../config/db.js";

const createRatingsTable = async () => {
    const queryText = `
   
CREATE TABLE IF NOT EXISTS ratings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,      -- normal user who rates
    store_id INT NOT NULL,     -- the store being rated
    rating INT CHECK (rating BETWEEN 1 AND 5),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

`;
    try {
        await pool.query(queryText);
        console.log('Rating table created successfully');
    } catch (error) {
        console.error('Error creating Ratings table:', error);
    }   
};

export default createRatingsTable;