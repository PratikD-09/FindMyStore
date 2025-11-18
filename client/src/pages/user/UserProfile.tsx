
import { FaUserCircle, FaEdit, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";


interface User {
  id: number, 
  email:string,
  username:string,
  address:string
}


const UserProfile = () => {
  const [userOfId , setUserOFId] = useState<User | null>(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/${user.id}`)
        setUserOFId(res.data.obj)
      } catch (error) {
        console.log(error);
      }
    }

    getUser();

  }, [])
console.log(userOfId);

  return (

    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4 mt-10">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">

        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-gray-400" size={100} />
          <h2 className="text-2xl font-bold mt-3">{userOfId?.username}</h2>
          <p className="text-gray-600">Regular User</p>

          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
            <FaEdit /> Edit Profile
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 border-t"></div>

        {/* Profile Information */}
        <h3 className="text-xl font-semibold mb-4">Profile Details</h3>

        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <FaEnvelope className="text-gray-600" />
            <p className="text-gray-800">{userOfId?.email}</p>
          </div>

  

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <FaMapMarkerAlt className="text-gray-600" />
            <p className="text-gray-800">{userOfId?.address}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t"></div>

        {/* Activity Section */}
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">⭐ Rated: "Modern SuperMart" — 4/5</p>
          <p className="text-gray-700 mt-2">⭐ Rated: "Grocery Hub" — 5/5</p>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default UserProfile;
