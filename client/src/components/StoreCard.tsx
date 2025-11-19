import { Star, MapPin } from "lucide-react";


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

export default function StoreCard({store} : StoreCardProps) {
     
 

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
