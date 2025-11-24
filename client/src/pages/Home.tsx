import Navbar from "../components/Navbar";
import UserStoreList from "./user/UserStoreList";





export default function Home() {


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

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
      <UserStoreList />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">FindMyStore</h2>
            <p className="text-gray-400 text-sm">
              Your trusted platform to discover the best local stores,
              explore ratings, and share your shopping experiences.
              Making your store hunting easier, faster, and reliable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/user/stores" className="hover:text-white transition">Find Stores</a></li>
              <li><a href="/login" className="hover:text-white transition">Login</a></li>
              <li><a href="/signup" className="hover:text-white transition">Sign Up</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
            <p className="text-gray-400 text-sm">
              📍 India
              <br />
              📧 support@findmystore.com
              <br />
              📞 +91 98765 43210
            </p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5">
          © {new Date().getFullYear()} FindMyStore. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}
