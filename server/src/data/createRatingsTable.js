import pool from "../config/db.js";

const createRatingsTable = async () => {
    const queryText = `
   
CREATE TABLE IF NOT EXISTS ratings (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    store_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
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