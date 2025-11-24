import { Star, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../API/axios.js";


type StoreType = {
  id: number;
  category:string,
  name: string;
  email: string;
  address: string;
}
type StoreCardProps = {
  store: StoreType;
};

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


export default function StoreCard({store} : StoreCardProps) {


  const [ratings, setRatings] = useState<RatingType[] | []>([]);


   const getReviews = async () => {
    try {
      const res = await API.get(`/api/ratings/store/${store.id}`);
      setRatings(res.data.data);
    } catch (error) {
      console.log(error)
    }
  }
       useEffect(() => {
         getReviews();
       }, [])

  const totalRatings = ratings.length;

  const sumRatings = ratings.reduce((sum, r) => sum + r.rating, 0);

  const avgRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
 

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
    >
      {/* Store Image */}
     

      <div className="p-5">

        {/* Store Name */}
        <h3 className="text-xl font-semibold text-indigo-700 truncate">
          {store.name}
        </h3>

        {/* Address */}
        <div className="flex items-center text-gray-600 mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{store.address}</span>
        </div>

        {/* Ratings */}
        <div className="flex items-center mt-3">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="font-semibold text-gray-800">
             {`${avgRating} / 5 `}
          </span>
        </div>

        {/* User Rating (Static) */}
        <p className="text-sm mt-2 text-gray-600">
          Your Rating: <span className="font-bold">Not rated yet</span>
        </p>

        {/* Button */}
        <button
         
          className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Rate Store
        </button>
      </div>
    </div>
  );
}
