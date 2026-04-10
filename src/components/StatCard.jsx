const StatCard = ({ title, value }) => {
  return (
    <div style={{
      flex: 1,
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  )
}

export default StatCard