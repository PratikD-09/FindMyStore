
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authReducer";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
  e.preventDefault();
  try {
    const user = await dispatch(loginUser(form)).unwrap();

    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } 
    else if (user.role === "store") {
      navigate("/owner/dashboard");
    } 
    else {
      navigate("/user/stores");
    }

  } catch (error) {
    alert("Invalid User Or User not available");
    console.log("Error:", error);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
