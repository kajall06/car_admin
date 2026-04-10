import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  const fetchVehicles = async () => {
    const res = await API.get("/admin/vehicles");
    setVehicles(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/admin/vehicles/${id}`);
    fetchVehicles();
  };

  return (
    <div className="p-3 md:p-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">
        <h2 className="text-2xl font-bold">🚗 Vehicles</h2>

        <button
          onClick={() => navigate("/admin/vehicles/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          + Add Vehicle
        </button>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white shadow rounded-xl p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((v) => (
              <tr key={v._id} className="border-b">
                <td className="p-2">{v.name}</td>
                <td className="p-2">₹{v.pricePerDay}</td>
                <td className="p-2">{v.status}</td>

                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/vehicles/edit/${v._id}`)}
                    className="bg-yellow-400 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(v._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-3">
        {vehicles.map((v) => (
          <div key={v._id} className="bg-white p-4 rounded-xl shadow">
            
            <p className="font-semibold text-lg">{v.name}</p>

            <p className="text-sm mt-1">💰 ₹{v.pricePerDay}</p>
            <p className="text-sm">📌 {v.status}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => navigate(`/admin/vehicles/edit/${v._id}`)}
                className="bg-yellow-400 px-3 py-1 rounded text-sm w-full"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(v._id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm w-full"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}