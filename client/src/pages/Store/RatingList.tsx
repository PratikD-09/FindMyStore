import RatingCard from "./RatingCard";
import type { RatingType } from "./types";

export default function RatingList() {
  const ratings: RatingType[] = [
    { id: 1, userName: "Rahul Sharma", rating: 5, comment: "Amazing store!" },
    { id: 2, userName: "Sneha Patil", rating: 4, comment: "Very good experience." },
    { id: 3, userName: "Amit Verma", rating: 3, comment: "Good but can improve." },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        User Feedback
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ratings.map((rating) => (
          <RatingCard key={rating.id} rating={rating} />
        ))}
      </div>
    </div>
  );
}
