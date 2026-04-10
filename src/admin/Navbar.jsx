import { LogOut, User, Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 shadow-sm">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={onMenuClick}
        >
          <Menu size={22} />
        </button>

        {/* Title */}
        <h2 className="text-sm md:text-lg font-semibold text-gray-700 truncate">
          Admin Dashboard
        </h2>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 md:gap-4">

        {/* User Info */}
        <div className="hidden sm:flex items-center gap-2 text-gray-600 text-sm md:text-base">
          <User size={18} />
          <span className="truncate max-w">
            {user?.email}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="flex items-center gap-1 md:gap-2 bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg transition text-sm md:text-base"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>

      </div>
    </div>
  );
}