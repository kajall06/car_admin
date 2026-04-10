const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  const logout = () => {
    localStorage.clear()
    window.location.href = "/login"
  }

  return (
    <div style={{
      height: "60px",
      background: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h4>Admin Dashboard</h4>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <span>{user?.email}</span>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header