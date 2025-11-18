import { Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// // User pages
import UserStoreList from "./pages/user/UserStoreList";
import StoreDescription from "./pages/user/StoreDescription";


import UserProfile from "./pages/user/UserProfile";

// // Store Owner pages
// import OwnerDashboard from "./pages/owner/OwnerDashboard";
// import OwnerRatings from "./pages/owner/OwnerRatings";

// // Admin pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StoreDashboard from "./pages/Store/StoreDashboard";
import ProtectedRoute from "./ProtectedRoute";
// import AdminUsers from "./pages/admin/AdminUsers";
// import AdminStores from "./pages/admin/AdminStores";
// import AdminViewUser from "./pages/admin/AdminViewUser";

// 404 Page
// import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Normal User Pages */}
      <Route
        path="/user/stores" 
        element={
          <ProtectedRoute allowedRoles={["user" ,"admin","store"]}>
            <UserStoreList />
          </ProtectedRoute>
        }
      />


      {/* <Route path="/stores/:id" element={<StoreDescription />} /> */}
      <Route
        path="/stores/:id" 
        element={
          <ProtectedRoute allowedRoles={["user","admin","store"]}>
            <StoreDescription />
          </ProtectedRoute>
        }
      />



      {/* <Route path="/user/profile" element={<UserProfile />} /> */}
       <Route
        path="/user/profile" 
        element={
          <ProtectedRoute allowedRoles={["user","admin","store"]}>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      

      {/* Store Owner Pages */}
      {/* <Route path="/owner/dashboard" element={<StoreDashboard />} /> */}
      
      <Route
        path="/owner/dashboard" 
        element={
          <ProtectedRoute allowedRoles={["store"]}>
            <StoreDashboard />
          </ProtectedRoute>
        }
      />


      {/* Admin Pages */}
      {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
       <Route
        path="/admin/dashboard" 
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
     
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
