"use client";
import { useState } from "react";

export default function CreateCustomer() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    dateOfBirth: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Customer created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Create New Customer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(form).map((field) => (
            <div key={field} className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 capitalize">
                {field}
              </label>
              <input
                type={field === "dateOfBirth" ? "date" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Customer
          </button>
        </form>
      </div>
    </div>
  );
}
