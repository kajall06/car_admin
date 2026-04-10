import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute"
import AdminLayout from "./admin/AdminLayout"

import Dashboard from "./views/Dashboard"
import Users from "./views/Users";
import Vehicles from "./views/Vehicles";
import Bookings from "./views/Bookings";
import AddVehicle from "./views/AddVehicle";
// (Optional) If you have login page
import Login from "./views/Login";
import ContactMessages from "./views/ContactMessages";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ✅ Redirect root → admin */}
      <Route path="/" element={<Navigate to="/admin" />} />

      {/* ================= ADMIN ROUTES ================= */}

      {/* Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Users */}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Users />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Vehicles */}
     <Route path="/admin/vehicles" element={<AdminLayout><Vehicles /></AdminLayout>} />
<Route path="/admin/vehicles/add" element={<AdminLayout><AddVehicle /></AdminLayout>} />
<Route path="/admin/vehicles/edit/:id" element={<AdminLayout><AddVehicle /></AdminLayout>}/>
      {/* Bookings */}
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Bookings />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
       <Route
        path="/admin/contact"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ContactMessages />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= OPTIONAL ================= */}

      {/* Login route (if you have) */}
      <Route path="/login" element={<Login />} />

      {/* 404 Page */}
      <Route path="*" element={<h1>404 Page Not Found</h1>} />

    </Routes>
  );
}