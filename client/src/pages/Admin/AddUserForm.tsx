import { useState } from "react";

export default function AddUserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "User",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Add New User</h2>

      <input
        name="name"
        type="text"
        placeholder="Full Name"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />

      <input
        name="address"
        type="text"
        placeholder="Address"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />

      <select
        name="role"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      >
        <option>User</option>
        <option>Admin</option>
        <option>StoreOwner</option>
      </select>

      <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Submit
      </button>
    </form>
  );
}
