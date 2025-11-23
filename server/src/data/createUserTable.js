import pool from "../config/db.js";

const createUserTable = async () => {
    const queryText = `
   
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    address TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user', 'store')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


`;
    try {
        await pool.query(queryText);
        console.log('User table created successfully');
    } catch (error) {
        console.error('Error creating user table:', error);
    }   
};

export default createUserTable;