import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";



type AddUserFormProps = {
  setUserList: React.Dispatch<React.SetStateAction<UserType[]>>;
};


interface UserType {
  id: number;
  username: string;
  email: string;
  address: string;
  role: string;
  rating?: number;
}


export default function AddUserForm({ setUserList }: AddUserFormProps) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    role: "User",
  });

  // Handles input + select safely
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validations
    if (!form.username.trim()) {
      alert("Username is required");
      return;
    }

    if (!form.email.trim()) {
      alert("Email is required");
      return;
    }

    if (!form.password || form.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    const requestData = {
      username: form.username,
      email: form.email,
      password: form.password,
      address: form.address,
      role: form.role, // IMPORTANT ✔
    };

    try {
      const response = await axios.post("/api/signup", requestData);

      alert("User Created Successfully!");
      console.log("User Created:", response.data);

      // Reset form after successful creation
      setForm({
        username: "",
        email: "",
        password: "",
        address: "",
        role: "User",
      });
    } catch (err: any) {
      alert(err.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Add New User</h2>

      <input
        name="username"
        type="text"
        placeholder="Full Name"
        className="w-full p-2 border rounded"
        value={form.username}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={form.password}
        onChange={handleChange}
      />

      <input
        name="address"
        type="text"
        placeholder="Address"
        className="w-full p-2 border rounded"
        value={form.address}
        onChange={handleChange}
      />

      <select
        name="role"
        className="w-full p-2 border rounded"
        value={form.role}
        onChange={handleChange}
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>

      <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Submit
      </button>
    </form>
  );
}
