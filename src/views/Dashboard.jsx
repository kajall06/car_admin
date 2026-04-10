import { useEffect, useState } from "react";
import { getUsers, getVehicles, getBookings } from "../api/api";

export default function Dashboard() {
  const [data, setData] = useState({
    users: 0,
    vehicles: 0,
    bookings: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getUsers();
        const vehicles = await getVehicles();
        const bookings = await getBookings();

        const bookingData = bookings.data.bookings;

        let pending = 0;
        let confirmed = 0;
        let cancelled = 0;
        let revenue = 0;

        bookingData.forEach((b) => {
          if (b.status === "pending") pending++;
          if (b.status === "confirmed") confirmed++;
          if (b.status === "cancelled") cancelled++;

          if (b.status === "confirmed") {
            revenue += b.totalPrice || 0;
          }
        });

        setData({
          users: users.data.users.length,
          vehicles: vehicles.data.length,
          bookings: bookingData.length,
          pending,
          confirmed,
          cancelled,
          revenue,
        });

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="p-4 md:p-6">

      <h2 className="text-2xl font-bold mb-6">
        📊 Dashboard
      </h2>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <Card title="Users" value={data.users} color="blue" />
        <Card title="Vehicles" value={data.vehicles} color="green" />
        <Card title="Bookings" value={data.bookings} color="purple" />
        <Card
          title="Revenue"
          value={`₹${data.revenue.toLocaleString()}`}
          color="yellow"
        />

      </div>

      {/* STATUS STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card title="Pending" value={data.pending} color="yellow" />
        <Card title="Confirmed" value={data.confirmed} color="green" />
        <Card title="Cancelled" value={data.cancelled} color="red" />

      </div>

    </div>
  );
}

/* ================= CARD ================= */

function Card({ title, value, color }) {
  const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
    red: "text-red-600",
    purple: "text-purple-600",
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 md:p-5 rounded-xl shadow hover:shadow-lg transition">

      {/* Title */}
      <p className="text-sm md:text-base text-gray-600 whitespace-nowrap">
        {title}
      </p>

      {/* Value */}
      <p
        className={`font-bold ${colors[color]} 
        text-base sm:text-lg md:text-xl 
        whitespace-nowrap`}
      >
        {value}
      </p>

    </div>
  );
}