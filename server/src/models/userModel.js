import pool from "../config/db.js";
import bcrypt from "bcrypt"



export const createUserService = async (username, email, password) => {

    // check if email already exists
    const findUser = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    if (findUser.rows.length > 0) {
        const error = new Error("Email already exists");
        error.status = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]
    );

    return result.rows[0];
};


// authorization service
export const loginService = async (email, password) => {
  const userResult = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (userResult.rows.length === 0) {
    throw new Error("User not found");
  }

  const user = userResult.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

export const getAllUsersService = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

export const getUserByIdService = async(id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};
export const updateUserByIdService = async (id, username, email) => {
    const result = await pool.query(
        'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *',
        [username, email, id]
    );
    return result.rows[0];
};

export const deleteUserByIdService = async (id) => {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};  
