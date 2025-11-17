import { Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StoreCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/stores/1"); // 👉 static store id for now
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
    >
      {/* Store Image */}
      <img
        src="https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=1200"
        alt="Store"
        className="w-full h-48 object-cover"
      />

      <div className="p-5">

        {/* Store Name */}
        <h3 className="text-xl font-semibold text-indigo-700 truncate">
          Sunrise Supermarket
        </h3>

        {/* Address */}
        <div className="flex items-center text-gray-600 mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">MG Road, Pune</span>
        </div>

        {/* Ratings */}
        <div className="flex items-center mt-3">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="font-semibold text-gray-800">
            4.5 / 5
          </span>
        </div>

        {/* User Rating (Static) */}
        <p className="text-sm mt-2 text-gray-600">
          Your Rating: <span className="font-bold">Not rated yet</span>
        </p>

        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent card click navigation
            alert("Rate clicked (static)");
          }}
          className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Rate Store
        </button>
      </div>
    </div>
  );
}
