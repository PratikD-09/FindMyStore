import { useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react";
import API from "../../API/axios.ts"


interface AddStoreFormProps {
  setpopup: Dispatch<SetStateAction<boolean>>; // React state setter
}


interface StoreFormData {
  owner_id: number | null;
  name: string;
  address: string;
  category: string;
  description: string;
  phone: string;
}

export default function AddStoreForm({ setpopup }: AddStoreFormProps) {

  const [store, setStore] = useState<StoreFormData>({
    owner_id: null,
    name: "",
    address: "",
    category: "",
    description: "",
    phone: "",
  });

  // FIXED handleChange — handles both number & text
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setStore((prev) => ({
      ...prev,
      [name]:
        name === "owner_id"
          ? value === "" ? null : Number(value) // convert to number
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/api/stores", store);
      alert("Store is created!!");
      setpopup(false);
    } catch (error : any) {
      console.log(error);
      alert(error.response.data.message)
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-2">Add New Store</h2>

      {/* OWNER ID */}
      <input
        name="owner_id"
        type="number"
        placeholder="owner_id"
        className="w-full p-2 border rounded"
        value={store.owner_id ?? ""}   // FIX: prevents null error
        onChange={handleChange}
        required
      />

      {/* Store Name */}
      <input
        name="name"
        type="text"
        placeholder="Store Name"
        className="w-full p-2 border rounded"
        value={store.name}
        onChange={handleChange}
        required
      />

      {/* Address */}
      <input
        name="address"
        type="text"
        placeholder="Store Address"
        className="w-full p-2 border rounded"
        value={store.address}
        onChange={handleChange}
      />

      {/* Category */}
      <input
        name="category"
        type="text"
        placeholder="Category (e.g., Grocery, Clothing)"
        className="w-full p-2 border rounded"
        value={store.category}
        onChange={handleChange}
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Store Description"
        className="w-full p-2 border rounded"
        rows={3}
        value={store.description}
        onChange={handleChange}
      ></textarea>

      {/* Phone */}
      <input
        name="phone"
        type="text"
        placeholder="Phone Number"
        className="w-full p-2 border rounded"
        value={store.phone}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
}
