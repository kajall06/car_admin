"use client";

import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function AddVehicle() {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    location: "",
    pricePerDay: "",
    seats: "",
    fuelType: "petrol",
    transmission: "manual",
    type: "SUV",
    year: "",
    features: "",
    image: null
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      API.get(`/admin/vehicles/${id}`).then((res) => {
        const v = res.data;
        setForm({
          ...form,
          name: v.name,
          brand: v.brand?._id || v.brand,
          location: v.location?._id || v.location,
          pricePerDay: v.pricePerDay,
          seats: v.seats,
          fuelType: v.fuelType,
          transmission: v.transmission,
          type: v.type,
          features: v.features?.join(", "),
          image: null
        });
      });
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("brand", form.brand);
      formData.append("location", form.location);
      formData.append("pricePerDay", Number(form.pricePerDay));
      formData.append("seats", Number(form.seats));
      formData.append("fuelType", form.fuelType);
      formData.append("transmission", form.transmission);
      formData.append("type", form.type);

      formData.append(
        "features",
        JSON.stringify(form.features.split(",").map(f => f.trim()))
      );

      if (form.image) {
        formData.append("images", form.image);
      }

      if (id) {
        await API.put(`/admin/vehicles/${id}`, formData);
      } else {
        await API.post("/admin/vehicles", formData);
      }

      navigate("/admin/vehicles");

    } catch (err) {
      console.log(err);
      alert("Error adding vehicle");
    }
  };

  // ================= UI =================
  const InputField = ({ label, ...props }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8">

      <h2 className="text-2xl font-bold mb-6 text-center">
        {id ? "Edit Vehicle" : "Add Vehicle"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4 sm:p-6 rounded-xl shadow">

        <InputField
          label="Vehicle Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <InputField
          label="Brand (ID)"
          value={form.brand}
          onChange={e => setForm({ ...form, brand: e.target.value })}
        />

        <InputField
          label="Location (ID)"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />

        <InputField
          label="Price Per Day"
          value={form.pricePerDay}
          onChange={e => setForm({ ...form, pricePerDay: e.target.value })}
        />

        <InputField
          label="Seats"
          value={form.seats}
          onChange={e => setForm({ ...form, seats: e.target.value })}
        />

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Fuel Type</label>
          <select
            className="border p-2 rounded-md"
            value={form.fuelType}
            onChange={e => setForm({ ...form, fuelType: e.target.value })}
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
            <option value="cng">CNG</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Transmission</label>
          <select
            className="border p-2 rounded-md"
            value={form.transmission}
            onChange={e => setForm({ ...form, transmission: e.target.value })}
          >
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>

        <InputField
          label="Type"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        />

        <InputField
          label="Features (comma separated)"
          value={form.features}
          onChange={e => setForm({ ...form, features: e.target.value })}
        />

        {/* IMAGE UI IMPROVED */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium mb-2">
            Vehicle Image
          </label>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

            <input
              type="file"
              accept="image/*"
              className="border p-2 rounded w-full sm:w-auto"
              onChange={e =>
                setForm({ ...form, image: e.target.files[0] })
              }
            />

            {form.image && (
              <img
                src={URL.createObjectURL(form.image)}
                alt="preview"
                className="w-32 h-20 object-cover rounded border"
              />
            )}
          </div>
        </div>

        {/* BUTTON */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg w-full sm:w-auto"
          >
            {id ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </div>

      </div>
    </div>
  );
}