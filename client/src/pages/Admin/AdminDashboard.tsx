import { useEffect, useState } from "react";
import { PlusCircle, User, Store, Users } from "lucide-react";
import PopupWrapper from "./PopupWrapper";
import AddUserForm from "./AddUserForm";
import AddStoreForm from "./AddStoreForm";
import UserDetails from "./UserDetails";
import Navbar from "../../components/Navbar";
import API from "../../API/axios.js";
import { RiDeleteBin2Fill } from "react-icons/ri";
// --------------------
// TypeScript Interfaces
// --------------------


interface UserType {
  id: number;
  username: string;
  email: string;
  address: string;
  role: string;
  rating?: number;
}

interface StoreType {
  id: number;
  category: string,
  name: string;
  email: string;
  address: string;
  rating?: number;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"users" | "stores">("users");
  const [showUserPopup, setShowUserPopup] = useState<boolean>(false);
  const [showStorePopup, setShowStorePopup] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [search, setSearch] = useState<string>("");

  // --------------------------
  // Use States for User & Store List
  // --------------------------
  const [userList, setUserList] = useState<UserType[]>([

  ]);

  const [storeList, setStoreList] = useState<StoreType[]>([

  ]);


  const getAllUsers = async () => {
    try {
      const res = await API.get("/api/users");
      // console.log(res.data.obj)
      setUserList(res.data.obj)
    } catch (error) {
      console.log(error)
    }

  }

  const getAllStores = async () => {
    try {
      const res = await API.get("/api/stores");
      setStoreList(res.data.data)
    } catch (error) {
      console.log(error)
    }

  }




  useEffect(() => {
    getAllUsers();
    getAllStores();

  }, [showStorePopup, showUserPopup, activeTab])


  const handleDeleteStore = async(id: number) => {
  // DELETE API call here
  await API.delete(`/api/stores/${id}`)
    .then(res => {
      console.log(res);
      // refresh page OR remove from UI
      setStoreList(storeList.filter(store => store.id !== id));
    })
    .catch(err => {
      console.log(err);
    });
};


 const handleDeleteUser = async (id: number) => {
  // DELETE API call here

  await API.delete(`/api/users/${id}`)
    .then(res => {
      console.log(res);
      // refresh page OR remove from UI
      alert(`User of id:${id} is deleted !!`)
      setUserList(userList.filter(user => user.id !== id));
    })
    .catch(err => {
      console.log(err);
    });
};



  // --------------------------
  // Search Filters
  // --------------------------
  const filteredUsers = userList.filter((u) =>
    `${u.username} ${u.email} ${u.address} ${u.role}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredStores = storeList.filter((s) =>
    `${s.name} ${s.email} ${s.address}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="p-6 mt-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 shadow-lg rounded-xl flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="text-blue-600" size={26} />
            </div>
            <div>
              <p className="text-gray-600">Total Users</p>
              <h2 className="text-3xl font-bold">{userList.length}</h2>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-xl flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Store className="text-green-600" size={26} />
            </div>
            <div>
              <p className="text-gray-600">Total Stores</p>
              <h2 className="text-3xl font-bold">{storeList.length}</h2>
            </div>
          </div>
        </div>

        {/* Add Buttons */}
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

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === "users" ? (
            <>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User size={22} /> User List
              </h3>

              <table className="w-full border-collapse table-fixed">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">Id</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Option</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 cursor-pointer border-b"
                      
                    >
                      <td onClick={() => setSelectedUser(user)} className="p-3">{user.id}</td>
                      <td onClick={() => setSelectedUser(user)} className="p-3">{user.username}</td>
                      <td onClick={() => setSelectedUser(user)} className="p-3">{user.email}</td>
                      <td onClick={() => setSelectedUser(user)} className="p-3">{user.address}</td>
                      <td onClick={() => setSelectedUser(user)} className="p-3">{user.role}</td>
                      <td className="p-3">
                        <RiDeleteBin2Fill
                          onClick={() => handleDeleteUser(user.id)}
                          className="fill-red-500 h-[25px] w-[25px] cursor-pointer"
                        />
                      </td>
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
                    <th className="p-3">Id</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Catagory</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3">Options</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStores.map((store) => (
                    <tr key={store.id} className="hover:bg-gray-50 border-b">
                      <td className="p-3">{store.id}</td>
                      <td className="p-3">{store.name}</td>
                      <td className="p-3">{store.category}</td>
                      <td className="p-3">{store.address}</td>
                      <td className="p-3">{Math.floor(store.rating ?? 0)}</td>
                      <td className="p-3">
                        <RiDeleteBin2Fill
                          onClick={() => handleDeleteStore(store.id)}
                          className="fill-red-500 h-[25px] w-[25px] cursor-pointer"
                        />
                      </td>
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
            <AddUserForm setpopup={setShowUserPopup} />
          </PopupWrapper>
        )}

        {showStorePopup && (
          <PopupWrapper onClose={() => setShowStorePopup(false)}>
            <AddStoreForm setpopup={setShowStorePopup} />
          </PopupWrapper>
        )}

        {selectedUser && (
          <PopupWrapper onClose={() => setSelectedUser(null)}>
            <UserDetails user={selectedUser} />
          </PopupWrapper>
        )}
      </div>
    </>
  );
}
