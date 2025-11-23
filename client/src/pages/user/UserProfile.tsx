import { FaUserCircle, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

export interface RatingType {
  id: number;
  user_id: string;
  store_id: number;
  rating: number;
  description: string | null;
  created_at: string;

  user_name?: string;
  store_name?: string;
}

interface User {
  id: number;
  email: string;
  username: string;
  address: string;
  role: string;
  password: string;
}

const UserProfile = () => {
  const [userOfId, setUserOFId] = useState<User | null>(null);
  const [ratings, setRatings] = useState<RatingType[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);

 const [editData, setEditData] = useState({
  username: "",
  email: "",
  address: "",
});

const [password, setPassword] = useState("");


  // Fetch user on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/${user.id}`);
        setUserOFId(res.data.obj);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  // Fill edit fields when user loads
  useEffect(() => {
  if (userOfId) {
    setEditData({
      username: userOfId.username,
      email: userOfId.email,
      address: userOfId.address,
    });
    setPassword(""); // password always blank
  }
}, [userOfId]);


  // Fetch ratings
  const getReviews = async () => {
    try {
      if (!userOfId?.username) return;

      const userId = userOfId.username;

      const res = await axios.get(`/api/ratings/user/${userId}`);
      setRatings(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, [userOfId]);

  const removeEmptyFields = (obj: any) => {
  const filtered: any = {};
  for (let key in obj) {
    if (obj[key] !== "" && obj[key] !== null && obj[key] !== undefined) {
      filtered[key] = obj[key];
    }
  }
  return filtered;
};


  // UPDATE PROFILE
 const handleUpdateProfile = async () => {
  try {
    const finalData: any = {};

    // add only modified fields
    if (editData.username.trim() !== "" && editData.username !== userOfId?.username) {
      finalData.username = editData.username.trim();
    }

    if (editData.email.trim() !== "" && editData.email !== userOfId?.email) {
      finalData.email = editData.email.trim();
    }

    if (editData.address.trim() !== "" && editData.address !== userOfId?.address) {
      finalData.address = editData.address.trim();
    }

    // only add password if user typed something
    if (password.trim() !== "") {
      finalData.password = password.trim();
    }

    // NO EMPTY FIELDS WILL BE SENT
    await axios.put(`/api/users/${userOfId?.id}`, finalData);

    alert("Profile updated successfully!");

    // Update UI with only changed values
    setUserOFId((prev) =>
      prev ? { ...prev, ...finalData } : prev
    );

    setIsEditOpen(false);
  } catch (error) {
    console.log(error);
    alert("Failed to update profile");
  }
};


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4 mt-10">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center">
            <FaUserCircle className="text-gray-400" size={100} />
            <h2 className="text-2xl font-bold mt-3">{userOfId?.username}</h2>
            <p className="text-gray-600">{`User Type : ${userOfId?.role}`}</p>

            <button
              onClick={() => setIsEditOpen(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </div>

          <div className="my-6 border-t"></div>

          {/* Profile Details */}
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

          {/* Ratings */}
          <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Reactions</h1>

            {ratings.length === 0 ? (
              <p className="text-gray-500 italic text-center mt-8">
                No ratings yet
              </p>
            ) : (
              <ul className="space-y-6">
                {ratings.map((rating) => (
                  <li
                    key={rating.id}
                    className="flex flex-col md:flex-row items-start md:items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xl font-bold mr-4 mb-4 md:mb-0">
                      {rating.store_name?.charAt(0).toUpperCase() ||
                        rating.store_id}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                        {rating.store_name || `Store ID: ${rating.store_id}`}
                      </h2>

                      <div className="flex items-center mt-1">
                        <span className="text-yellow-400 font-bold mr-2">
                          {rating.rating}
                        </span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < rating.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                                }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.642 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.287-3.957z" />
                            </svg>
                          ))}
                        </div>
                      </div>

                      <p className="mt-3 text-gray-700 text-sm">
                        {rating.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-semibold">Edit Profile</h2>


            <div>
              <label className="text-gray-700 font-medium">Username</label>
              <input
                type="text"
                value={editData.username}
                onChange={(e) =>
                  setEditData({ ...editData, username: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-gray-700 font-medium">Address</label>
              <input
                type="text"
                value={editData.address}
                onChange={(e) =>
                  setEditData({ ...editData, address: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) =>
                  setPassword( e.target.value )
                }
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
