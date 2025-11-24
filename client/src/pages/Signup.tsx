import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API/axios.ts"; // adjust the path depending on your file location

const Signup = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const res = await API.post("/api/signup")
  //   } catch (error) {
      
  //   }

  //   // TODO: Call backend API
  //   console.log("Signup Data:", form);
  // };


   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.password || form.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    const requestData = {
      username: form.username,
      email: form.email,
      password: form.password,
      address:form.address
    };

    try {
      const response = await API.post("/api/signup", requestData);
      console.log(response);
      navigate("/login")
    } catch (err: any) {
      if ((err)) {
        console.error("Error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Registration failed");
      } else {
        console.error("An unknown error occurred");
      }
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            minLength={2}
            maxLength={10}
            required
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

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
            type="text"
            name="address"
            placeholder="Address"
            maxLength={400}
            required
            value={form.address}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength={4}
            maxLength={16}
            required
            // pattern="(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
