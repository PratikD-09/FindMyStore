import RatingList from "./RatingList";
import { Star, Store } from "lucide-react";

export default function StoreDashboard() {
  const averageRating = 4.3;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

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
            <span className="text-4xl font-bold text-indigo-700">{averageRating}</span>
          </div>

          {/* Meter */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all"
              style={{ width: `${(averageRating / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Total Ratings */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-md border border-white">
          <h2 className="text-lg font-semibold text-gray-700">Total Ratings</h2>
          <p className="text-4xl font-bold text-indigo-700 mt-3">32</p>
        </div>

        {/* Store Badge */}
        <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold">Store Performance</h2>
          <p className="text-sm opacity-90 mt-1">Based on user feedback</p>

          <div className="mt-4">
            <span className="inline-block px-4 py-2 bg-white/20 rounded-xl backdrop-blur">
              ⭐ Excellent
            </span>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <RatingList />
    </div>
  );
}
