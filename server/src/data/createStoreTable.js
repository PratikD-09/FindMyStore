import pool from "../config/db.js";

const createStoreTable = async () => {
    const queryText = `
   
CREATE TABLE IF NOT EXISTS stores (
    id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL ,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    category VARCHAR(50),
    description TEXT,
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


`;
    try {
        await pool.query(queryText);
        console.log('Store table created successfully');
    } catch (error) {
        console.error('Error creating store table:', error);
    }   
};

export default createStoreTable;