import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Car,
  BookOpen,
  X,
} from "lucide-react";

export default function Sidebar({ close }) {
  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition";

  const activeClass = "bg-gray-800";

  return (
    <div className="w-64 h-full bg-gray-900 text-white p-5 flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-8">

        <h1 className="text-xl md:text-2xl font-bold">
          🚗 Admin
        </h1>

        {/* Close Button (Mobile Only) */}
        <button
          className="md:hidden"
          onClick={close}
        >
          <X size={22} />
        </button>

      </div>

      {/* ================= LINKS ================= */}
      <nav className="flex flex-col gap-2">

        <NavLink
          to="/admin"
          onClick={close}
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          onClick={close}
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <Users size={18} />
          Users
        </NavLink>

        <NavLink
          to="/admin/vehicles"
          onClick={close}
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <Car size={18} />
          Vehicles
        </NavLink>

        <NavLink
          to="/admin/bookings"
          onClick={close}
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <BookOpen size={18} />
          Bookings
        </NavLink>

        <NavLink
          to="/admin/contact"
          onClick={close}
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <BookOpen size={18} />
          Contact Messages
        </NavLink>

      </nav>

    </div>
  );
}