import { useState } from "react";

export default function CustomerForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    address: initialData.address || "",
    city: initialData.city || "",
    state: initialData.state || "",
    country: initialData.country || "",
    postalCode: initialData.postalCode || "",
    dateOfBirth: initialData.dateOfBirth || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(form).map((field) => (
        <div key={field}>
          <label>{field}</label>
          <input
            type={field === "dateOfBirth" ? "date" : "text"}
            name={field}
            value={form[field]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Save</button>
    </form>
  );
}
