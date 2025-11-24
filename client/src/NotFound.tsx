import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-[120px] font-extrabold text-indigo-600 leading-none drop-shadow-lg animate-pulse">
        404
      </h1>

      <p className="text-2xl font-semibold text-gray-800 mt-2">
        Oops! Page Not Found
      </p>

      <p className="mt-2 text-gray-600 max-w-md text-center">
        The page you're looking for doesn't exist or was moved.  
        Let's get you back on the right track!
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all"
      >
        Go Back Home
      </Link>

     
    </div>
  );
};

export default NotFound;
