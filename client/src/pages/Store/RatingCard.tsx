import { Star, User } from "lucide-react";
import type { RatingType } from "./types";

export default function RatingCard({ rating }: { rating: RatingType }) {
  return (
    <div className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow-md border border-white hover:shadow-xl hover:-translate-y-1 transition-all">

      {/* User */}
      <div className="flex items-center gap-3">
        <div className="bg-indigo-100 p-3 rounded-full shadow">
          <User className="h-6 w-6 text-indigo-700" />
        </div>
        <h3 className="text-lg font-semibold">{rating.userName}</h3>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-3">
        {Array.from({ length: rating.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-500" />
        ))}
      </div>

      {/* Comment */}
      <p className="mt-3 text-gray-700 text-sm leading-relaxed">
        {rating.comment}
      </p>
    </div>
  );
}
