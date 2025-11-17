import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <section className="pt-32 pb-20 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          Rate Stores. Discover Genuine Feedback.
        </h2>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          A platform where users share real experiences. Store owners improve quality.
          Admins monitor everything — all in one system.
        </p>

        <Link
          to="/signup"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </section>

      {/* About Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-gray-50">
            <h3 className="text-xl font-semibold text-blue-600">Normal Users</h3>
            <p className="mt-2 text-gray-600">
              Search and rate stores. Update ratings anytime. Manage your profile.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-gray-50">
            <h3 className="text-xl font-semibold text-green-600">Store Owners</h3>
            <p className="mt-2 text-gray-600">
              View customer ratings and track average score of your store.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-gray-50">
            <h3 className="text-xl font-semibold text-purple-600">Admin</h3>
            <p className="mt-2 text-gray-600">
              Manage users, stores, ratings and view full platform statistics.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500">
        © {new Date().getFullYear()} StoreRating Platform. All Rights Reserved.
      </footer>
    </div>
  );
}
