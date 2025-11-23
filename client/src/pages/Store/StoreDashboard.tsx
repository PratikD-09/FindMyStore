import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import RatingList from "./RatingList";
import { Star, Store } from "lucide-react";
import axios from "axios";
import { useLocation } from "react-router-dom";

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

interface StoreType {
  id: number;
  owner_id: number;
  name: string;
  address: string;
  category: string;
  description: string;
  phone: string;
  created_at: string;
}

export default function StoreDashboard() {





  const [store, setStore] = useState<StoreType | null>(null)
  const [flag, setFlag] = useState(false);

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  // console.log(id)

  const getStoreInfo = async () => {
    try {

      const storedUser = localStorage.getItem("user");

      let owner_id;

      if (!storedUser) {
        console.error("User not found in localStorage");
      } else {
        const user = JSON.parse(storedUser);
        owner_id = user.id; // this works
        console.log(owner_id);
      }


      const res = await axios.get(`/api/owner/${owner_id}`)
      console.log(res.data.data)
      setStore(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }


  const [ratings, setRatings] = useState<RatingType[] | []>([]);


  const getReviews = async () => {

    if (!store?.id) {
      console.log("Store ID not available yet");
      return;
    }

    const storeid = store.id;

    try {
      console.log(storeid)
      const res = await axios.get(`/api/ratings/store/${storeid}`);
      console.log(res.data.data)
      setRatings(res.data.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStoreInfo();
    
  }, [])

  useEffect(() => {
    getReviews();
    
  }, [store])


   const totalRatings = ratings.length;

  const sumRatings = ratings.reduce((sum, r) => sum + r.rating, 0);

  const avgRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

  // Performance based on average rating
  let performance = "";
  if (avgRating >= 4.5) performance = "Excellent";
  else if (avgRating >= 3.5) performance = "Good";
  else if (avgRating >= 2.5) performance = "Decent";
  else performance = "Needs Improvement";



  return (
    <>
      <Navbar />

      <div className="p-6 mt-11 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Store className="h-10 w-10 text-indigo-600" />
          <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-sm">
            Store Owner Dashboard
          </h1>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {/* Average Rating Card */}
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-md border border-white">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Average Rating</h2>

            <div className="flex items-center gap-3">
              <Star className="h-10 w-10 text-yellow-500 drop-shadow-md" />
              <span className="text-4xl font-bold text-indigo-700">{avgRating}</span>
            </div>

            {/* Meter */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all"
                style={{ width: `${(avgRating / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Total Ratings */}
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-md border border-white">
            <h2 className="text-lg font-semibold text-gray-700">Total Ratings</h2>
            <p className="text-4xl font-bold text-indigo-700 mt-3">{totalRatings}</p>
          </div>

          {/* Store Badge */}
          <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold">Store Performance</h2>
            <p className="text-sm opacity-90 mt-1">Based on user feedback</p>

            <div className="mt-4">
              <span className="inline-block px-4 py-2 bg-white/20 rounded-xl backdrop-blur">
                ⭐ {performance}
              </span>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <RatingList  ratings={ratings} />
      </div>

    </>


  );
}
