//standerdize error response format

import { createUserService, 
    deleteUserByIdService,
    getAllUsersService, 
    getUserByIdService, 
    loginService, 
    updateUserByIdService } from "../models/userModel.js";

const handleResponse = (res, status, success, message, obj = null) => {
    res.status(status).json({
        success,
        message,
        obj,
    });
};


export const createUser = async (req, res, next) => {
    const { username, email, password, address , role} = req.body;

    if (!username || !email || !password) {
        return next({ status: 400, message: "All fields are required" });
    }
    // if(!role){
    //     role="user";
    // }

    try {
        const newUser = await createUserService(username, email, password , address , role);
        handleResponse(res, 201, true, 'User created successfully', newUser);
    } catch (error) {
        next(error);
    }
};


export const loginUser = async (req , res , next) => {
    const { email, password } = req.body;
    try {
        const loginData = await loginService(email, password);
        handleResponse(res, 200, true, 'Login successful', loginData);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req , res , next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, true, 'Users retrieved successfully', users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req , res , next) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdService(id); 
        if (!user) {
            return handleResponse(res, 404, false, 'User not found');
        }
        handleResponse(res, 200, true, 'User retrieved successfully', user);
    } catch (error) {
        next(error);
    }   
};

import bcrypt from "bcrypt";

export const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = { ...req.body };

    // If password is present and not empty, hash it
    if (data.password && data.password.trim() !== "") {
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      delete data.password; // prevent overwriting old password with empty value
    }

    const updatedUser = await updateUserByIdService(id, data);

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const deleteUserById = async (req , res , next) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUserByIdService(id);
        if (!deletedUser) {
            return handleResponse(res, 404, false, 'User not found');
        }
        handleResponse(res, 200, true, 'User deleted successfully', deletedUser);
    } catch (error) {
        next(error);
    }
};
