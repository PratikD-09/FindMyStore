import express from "express";
import { createUser,loginUser, deleteUserById, getAllUsers, getUserById, updateUserById } from "../controllers/userController.js ";

const router = express.Router();


router.post('/signup',createUser);
router.post('/login',loginUser)
router.get('/users',getAllUsers);
router.get('/users/:id',getUserById);
router.delete('/users/:id',deleteUserById);
router.put('/users/:id',updateUserById);


export default router;