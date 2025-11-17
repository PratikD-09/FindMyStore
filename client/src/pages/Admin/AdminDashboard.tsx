import { useState } from "react";
import { PlusCircle, User, Store, List, Star, Users } from "lucide-react";
import PopupWrapper from "./PopupWrapper";
import AddUserForm from "./AddUserForm";
import AddStoreForm from "./AddStoreForm";
import UserDetails from "./UserDetails";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showStorePopup, setShowStorePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");

  const userList = [
    { id: 1, name: "Pratik Dhandare", email: "pratik@gmail.com", address: "Pune", role: "Admin" },
    { id: 2, name: "Rohit Sharma", email: "rohit@gmail.com", address: "Nashik", role: "User" },
    { id: 3, name: "Amit Yadav", email: "amit@gmail.com", address: "Mumbai", role: "StoreOwner", rating: 4.3 },
  ];

  const storeList = [
    { id: 1, name: "Sunrise Supermarket", email: "sunrise@mail.com", address: "MG Road, Pune", rating: 4.5 },
    { id: 2, name: "City Mart", email: "citymart@mail.com", address: "Baner, Pune", rating: 4.2 },
  ];

  const filteredUsers = userList.filter((u) =>
    `${u.name} ${u.email} ${u.address} ${u.role}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredStores = storeList.filter((s) =>
    `${s.name} ${s.email} ${s.address}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>


      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* Total Users */}
        <div className="bg-white p-6 shadow-lg rounded-xl flex items-center gap-4 hover:shadow-xl transition">
          <div className="bg-blue-100 p-3 rounded-full">
            <Users className="text-blue-600" size={26} />
          </div>
          <div>
            <p className="text-gray-600">Total Users</p>
            <h2 className="text-3xl font-bold">120</h2>
          </div>
        </div>

        {/* Total Stores */}
        <div className="bg-white p-6 shadow-lg rounded-xl flex items-center gap-4 hover:shadow-xl transition">
          <div className="bg-green-100 p-3 rounded-full">
            <Store className="text-green-600" size={26} />
          </div>
          <div>
            <p className="text-gray-600">Total Stores</p>
            <h2 className="text-3xl font-bold">42</h2>
          </div>
        </div>

        {/* Total Ratings */}
       
      </div>

      {/* Add User + Add Store Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <button
          onClick={() => setShowUserPopup(true)}
          className="bg-teal-600 text-white p-6 rounded-xl shadow hover:bg-teal-700 transition flex flex-col items-center gap-2"
        >
          <PlusCircle size={32} /> Add New User
        </button>

        <button
          onClick={() => setShowStorePopup(true)}
          className="bg-indigo-600 text-white p-6 rounded-xl shadow hover:bg-indigo-700 transition flex flex-col items-center gap-2"
        >
          <PlusCircle size={32} /> Add New Store
        </button>
      </div>

      {/* Toggle */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === "users" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
        >
          User List
        </button>

        <button
          onClick={() => setActiveTab("stores")}
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === "stores" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
        >
          Store List
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by Name, Email, Address, Role…"
        className="w-full p-3 mb-4 border rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {activeTab === "users" ? (
          <>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User size={22} /> User List
            </h3>

            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 cursor-pointer border-b "
                    onClick={() => setSelectedUser(user)}
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.address}</td>
                    <td className="p-3">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Store size={22} /> Store List
            </h3>

            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredStores.map((store) => (
                  <tr key={store.id} className="hover:bg-gray-50 border-b">
                    <td className="p-3">{store.name}</td>
                    <td className="p-3">{store.email}</td>
                    <td className="p-3">{store.address}</td>
                    <td className="p-3">{store.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* POPUPS */}
      {showUserPopup && (
        <PopupWrapper onClose={() => setShowUserPopup(false)}>
          <AddUserForm />
        </PopupWrapper>
      )}

      {showStorePopup && (
        <PopupWrapper onClose={() => setShowStorePopup(false)}>
          <AddStoreForm />
        </PopupWrapper>
      )}

      {selectedUser && (
        <PopupWrapper onClose={() => setSelectedUser(null)}>
          <UserDetails user={selectedUser} />
        </PopupWrapper>
      )}
    </div>
  );
}
