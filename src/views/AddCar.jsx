import { useState } from "react"
import API from  "../api/api"
import { useNavigate } from "react-router-dom"

const AddCar = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
  })

  const navigate = useNavigate()

  const handleSubmit = async () => {
    await API.post("/admin/vehicles", form)
    navigate("/cars")
  }

  return (
    <div>
      <h2>Add Car</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddCar