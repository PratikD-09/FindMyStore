import axios from "axios";
import { Star, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";


interface StoreType  {
   id: number;
  owner_id: number;
  name: string;
  address: string;
  category: string;
  description: string;
  phone: string;
  created_at: string;
}

export default function StoreDescription() {

  const [store , setStore] = useState<StoreType | null>(null)

  const location = useLocation();
  const id =location.pathname.split("/")[2];
  console.log(id)


  const getStoreInfo = async()=>{
    try {
      const res = await axios.get(`/api/stores/${id}`)
      // console.log(res.data.data)
      setStore(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(store);

  useEffect(() => {
    getStoreInfo()
  }, [location])
  
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmitReview = async() => {
    if (!rating || rating < 1 || rating > 5)
      return alert("Rating must be between 1 and 5");

    if (!reviewText.trim())
      return alert("Please write a review description");
    const ratingData = {
      
    }

    try {
      const res = axios.post("",ratingData)
    } catch (error) {
      console.log(error)
    }


    alert(`Review Submitted!\nRating: ${rating}\nMessage: ${reviewText}`);
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto mt-8 p-4">
      {/* Banner Image */}
      {/* <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
        <img
          src="https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=1200"
          alt="Store Banner"
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Store Intro */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-indigo-700">
          {store?.name}
        </h1>

        {/* Address */}
        <div className="flex items-center text-gray-600 mt-2">
          <MapPin className="h-5 w-5 mr-2" />
          <span className="text-lg">{store?.address}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-3">
          <Star className="h-5 w-5 text-yellow-500 mr-1" />
          <span className="text-lg font-semibold text-gray-800">
            4.5 / 5 (120 reviews)
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700 leading-relaxed">
          {store?.description}
        </p>
      </div>

      {/* Add Rating Section */}
      <div className="mt-10 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add Your Rating
        </h2>

        {/* Rating Dropdown */}
        <label className="block font-medium text-gray-700 mb-1">
          Select Rating (1 - 5)
        </label>
        <select
          className="border rounded-md p-2 w-full mb-4"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={0}>Choose Rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        {/* Review Text */}
        <label className="block font-medium text-gray-700 mb-1">
          Review Description
        </label>
        <textarea
          className="border rounded-md p-2 w-full h-28 resize-none mb-4"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmitReview}
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Submit Review
        </button>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Customer Reviews
        </h2>

        <div className="space-y-4">
          {/* Review 1 */}
          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-semibold">5 / 5</span>
            </div>
            <p className="text-gray-700">
              Great store! Good quality products and helpful staff.
            </p>
            <p className="text-gray-500 text-sm mt-1">— Rohan Patil</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
