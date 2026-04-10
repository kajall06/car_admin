import { useEffect, useState } from "react";
import API from "../api/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  // ✅ Fetch function
  const fetchBookings = async () => {
    try {
      const res = await API.get("/admin/bookings");
      setBookings(res.data.bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // ✅ LIVE AUTO REFRESH
  useEffect(() => {
    fetchBookings(); // first load

    const interval = setInterval(() => {
      fetchBookings(); // refresh every 5 sec
    }, 5000);

    return () => clearInterval(interval); // cleanup
  }, []);

  // update status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/bookings/${id}`, { status });
      fetchBookings(); // refresh instantly after update
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getStatusClass = (status) => {
    if (status === "confirmed") return "bg-green-100 text-green-700";
    if (status === "cancelled") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📅 Booking Management</h2>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-1 gap-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-semibold text-lg">
                  {b.user?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  {b.vehicle?.name || "N/A"}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                  b.status
                )}`}
              >
                {b.status}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
              <p>
                <b>Pickup:</b>
                <br />
                {new Date(b.pickupDate).toLocaleDateString()}
              </p>
              <p>
                <b>Return:</b>
                <br />
                {new Date(b.returnDate).toLocaleDateString()}
              </p>
              <p>
                <b>Total:</b>
                <br />₹{b.totalPrice}
              </p>
              <p>
                <b>Payment:</b>
                <br />
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    b.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : b.paymentStatus === "failed"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {b.paymentStatus}
                </span>
              </p>
            </div>

            <div className="flex gap-3 mt-4 justify-end">
              {b.status !== "confirmed" && (
                <button
                  onClick={() => updateStatus(b._id, "confirmed")}
                  className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Confirm
                </button>
              )}

              {b.status !== "cancelled" && (
                <button
                  onClick={() => updateStatus(b._id, "cancelled")}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white p-4 rounded-xl shadow space-y-2">
            <p className="font-semibold">{b.user?.name || "N/A"}</p>
            <p className="text-sm text-gray-600">{b.vehicle?.name || "N/A"}</p>

            <p className="text-sm">
              Pickup: {new Date(b.pickupDate).toLocaleDateString()}
            </p>
            <p className="text-sm">
              Return: {new Date(b.returnDate).toLocaleDateString()}
            </p>

            <p className="text-sm font-medium">₹{b.totalPrice}</p>

            <div className="flex gap-2">
              <span
                className={`px-2 py-1 rounded text-xs ${getStatusClass(
                  b.status
                )}`}
              >
                {b.status}
              </span>

              <span
                className={`px-2 py-1 rounded text-xs ${
                  b.paymentStatus === "paid"
                    ? "bg-green-500 text-white"
                    : b.paymentStatus === "failed"
                    ? "bg-red-500 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                {b.paymentStatus}
              </span>
            </div>

            <div className="flex gap-2 mt-3">
              {b.status !== "confirmed" && (
                <button
                  onClick={() => updateStatus(b._id, "confirmed")}
                  className="bg-green-500 text-white px-3 py-1 rounded w-full"
                >
                  Confirm
                </button>
              )}

              {b.status !== "cancelled" && (
                <button
                  onClick={() => updateStatus(b._id, "cancelled")}
                  className="bg-red-500 text-white px-3 py-1 rounded w-full"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}