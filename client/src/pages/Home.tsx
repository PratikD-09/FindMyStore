import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserStoreList from "./user/UserStoreList";
import axios from "axios";





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
      </section>

      {/* About Section */}
     <UserStoreList/>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500">
        © {new Date().getFullYear()} StoreRating Platform. All Rights Reserved.
      </footer>
    </div>
  );
}
