import { Star, User } from "lucide-react";
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


interface ratingProps {
  ratings: RatingType[];
}

export default function RatingList({ ratings }: ratingProps) {
  // const ratings: RatingType[] = [
  //   { id: 1, userName: "Rahul Sharma", rating: 5, comment: "Amazing store!" },
  //   { id: 2, userName: "Sneha Patil", rating: 4, comment: "Very good experience." },
  //   { id: 3, userName: "Amit Verma", rating: 3, comment: "Good but can improve." },
  // ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        User Feedback
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ratings.map((rating) => (
          <div key={rating.id} className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow-md border border-white hover:shadow-xl hover:-translate-y-1 transition-all">

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-full shadow">
                <User className="h-6 w-6 text-indigo-700" />
              </div>
              <h3 className="text-lg font-semibold">{rating.user_id}</h3>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              {Array.from({ length: rating.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-500" />
              ))}
            </div>

            {/* Comment */}
            <p className="mt-3 text-gray-700 text-sm leading-relaxed line-clamp-2">
              {rating.description}
            </p>


          </div>))}
      </div>
    </div>
  );
}
