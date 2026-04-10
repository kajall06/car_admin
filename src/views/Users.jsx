import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-3 md:p-4">
      <h2 className="text-xl mb-4 font-bold">Users</h2>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block">
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">
                  <button
                    onClick={async () => {
                      await deleteUser(u._id);
                      fetchUsers();
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CARD VIEW (MOBILE) ================= */}
      <div className="md:hidden space-y-3">
        {users.map((u) => (
          <div key={u._id} className="bg-white p-4 rounded-xl shadow">
            <p className="font-semibold text-lg">{u.name}</p>
            <p className="text-sm text-gray-600">{u.email}</p>

            <button
              onClick={async () => {
                await deleteUser(u._id);
                fetchUsers();
              }}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}