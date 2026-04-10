import { useEffect, useState } from "react";
import API from "../api/api";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await API.get("/contact");
    setMessages(res.data.contacts);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📩 Contact Messages</h2>

      <div className="space-y-4">

        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <p className="font-semibold"> Name: {msg.name.toUpperCase()}</p>
            <p className=" mt-1 text-sm text-gray-700">Email: {msg.email}</p>
            <p className="mt-1 text-gray-700">Message: {msg.message}</p>

            <p className="text-xs text-gray-400 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}