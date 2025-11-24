import type { Dispatch } from "react";
import axios from "axios";
import { useState, type ChangeEvent, type FormEvent, type SetStateAction } from "react";


interface AddUserFormProps {
  setpopup: Dispatch<SetStateAction<boolean>>; // React state setter
}



export default function AddUserForm({ setpopup  }: AddUserFormProps) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    role: "user",
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

      alert(`${response.data.message}`);
      setpopup(false);

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
        <option value="user">user</option>
        <option value="admin">admin</option>
        <option value="store">store</option>
      </select>

      <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Submit
      </button>
    </form>
  );
}
