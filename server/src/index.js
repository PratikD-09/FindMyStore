import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import userRouter from './routes/userRoutse.js';
import storeRouter from './routes/storeRouts.js';
import ratingsRouter from './routes/ratingsRouts.js'
import errorHandler from './middlewares/errorHandler.js';
import { createUser } from './controllers/userController.js';
import createUserTable from './data/createUserTable.js';
import createRatingsTable from './data/createRatingsTable.js';
import createStoreTable from './data/createStoreTable.js';





dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(cors());


// Sample route to test database connection
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT current_database()');
        res.send(`The connected database is: ${result.rows[0].current_database}`);

    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ success: false, message: 'Database connection error' });
    }
});



app.use('/api', userRouter); // Assuming userRouter is imported from userRoutse.js
app.use('/api', storeRouter); // Assuming userRouter is imported from userRoutse.js
app.use('/api', ratingsRouter); // Assuming userRouter is imported from userRoutse.js
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: "Store Rating Backend Working" 
    });
});




// Error handling middleware
app.use(errorHandler);


//create user table on server start
createUserTable();
createRatingsTable();
createStoreTable()



app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT );
});

