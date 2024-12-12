// pages/index.tsx

import { useState, useEffect } from "react";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

interface Record {
  id: number;
  name: string;
  age: number;
}

const Home = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [records, setRecords] = useState<Record[]>([]);
  const [editingRecord, setEditingRecord] = useState<Record | null>(null); // Track the record being edited

  // Add record
  const handleAddRecord = async () => {
    const response = await fetch("/api/adarsh/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age }),
    });
    const data = await response.json();
    setMessage(data.message);

    // Reset form
    setName("");
    setAge(0);

    // Refresh records list
    fetchRecords();
  };

  // Delete record
  const handleDeleteRecord = async (id: number) => {
    const response = await fetch(`/api/adarsh/delete?id=${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    setMessage(data.message);
    fetchRecords(); // Refresh records list
  };

  const fetchRecords = async () => {
    const response = await fetch("/api/adarsh/get");
    const data = await response.json();

    // Check if the data is an array and contains records
    if (Array.isArray(data)) {
      setRecords(data); // Set records to empty array if no records
    } else {
      setRecords([]); // Fallback to empty array if data is not an array
    }
  };

  // Fetch records on component mount
  useEffect(() => {
    fetchRecords();
  }, []);

  // Handle record update
  const handleUpdate = async () => {
    if (!editingRecord) return;

    const response = await fetch("/api/adarsh/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingRecord.id,
        name,
        age,
      }),
    });

    if (response.ok) {
      setMessage("Record updated successfully!");
    } else {
      setMessage("Error updating record.");
    }

    // Reset form and stop editing
    setName("");
    setAge(0);
    setEditingRecord(null);
    fetchRecords();
  };

  // Set form values to the record being edited
  const handleEdit = (record: Record) => {
    setName(record.name);
    setAge(record.age);
    setEditingRecord(record); // Mark as editing
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        MySQL CRUD App
      </h1>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="age"
            className="block text-gray-700 font-semibold mb-2"
          >
            Age
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            placeholder="Enter age"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={editingRecord ? handleUpdate : handleAddRecord}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {editingRecord ? "Update Record" : "Add Record"}
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 text-center">
        Records
      </h2>
      <ul className="space-y-4">
        {records.map((record) => (
          <li
            key={record.id}
            className="flex justify-between items-center p-5 bg-white shadow-lg rounded-lg mb-4 hover:shadow-xl transition duration-300 ease-in-out"
          >
            <span className="text-lg text-gray-800 font-semibold">
              {record.name} ({record.age})
            </span>
            <div className="flex space-x-3">
              <button
                onClick={() => handleDeleteRecord(record.id)}
                className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(record)}
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
