import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ================= SIDEBAR ================= */}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar (overlay) */}
      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">

          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative z-50">
            <Sidebar close={() => setOpen(false)} />
          </div>

        </div>
      )}

      {/* ================= MAIN ================= */}

      <div className="flex-1 flex flex-col w-full">

        {/* Navbar */}
        <div className="sticky top-0 z-30">
          <Navbar onMenuClick={() => setOpen(true)} />
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-3 md:p-6">

          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6 min-h-full">

            {children}

          </div>

        </main>

      </div>
    </div>
  );
}