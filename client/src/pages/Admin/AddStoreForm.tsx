import { useState } from "react";

export default function AddStoreForm() {
  const [store, setStore] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Add New Store</h2>

      <input
        name="name"
        type="text"
        placeholder="Store Name"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Store Email"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />

      <input
        name="address"
        type="text"
        placeholder="Store Address"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />

      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Submit
      </button>
    </form>
  );
}
