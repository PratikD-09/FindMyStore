import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
    <nav className="w-full shadow bg-white fixed top-0 left-0 z-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-blue-600">StoreRating</h1>

          <div className="space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 transition"
            >
              Signup
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
