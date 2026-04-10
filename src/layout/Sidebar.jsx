import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
  const location = useLocation()

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Cars", path: "/cars" },
    { name: "Add Car", path: "/add-car" },
    { name: "Bookings", path: "/bookings" },
    
    { name: "Users", path: "/users" },
  ]

  return (
    <div style={{
      width: "240px",
      height: "100vh",
      background: "#111827",
      color: "white",
      padding: "20px"
    }}>
      <h2 style={{ marginBottom: "30px" }}>🚗 Admin</h2>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: "block",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            textDecoration: "none",
            color: "white",
            background:
              location.pathname === item.path ? "#4f46e5" : "transparent",
          }}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default Sidebar