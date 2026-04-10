import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role !== "admin") {
        return alert("Not admin");
      }

      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

      </div>

    </div>
  );
};

export default Login;