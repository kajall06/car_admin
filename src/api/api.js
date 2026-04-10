import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// USERS
export const getUsers = () => API.get("/admin/users");
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

// VEHICLES
export const getVehicles = () => API.get("/admin/vehicles");
export const createVehicle = (data) => API.post("/admin/vehicles", data);
export const deleteVehicle = (id) => API.delete(`/admin/vehicles/${id}`);

// BOOKINGS
export const getBookings = () => API.get("/admin/bookings");
export const deleteBooking = (id) => API.delete(`/admin/bookings/${id}`);


export default API