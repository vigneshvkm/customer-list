import { useEffect, useState } from "react";
import Link from "next/link";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  // Fetch customers from API
  useEffect(() => {
    async function fetchCustomers() {
      const res = await fetch("/api/customers");
      const data = await res.json();
      setCustomers(data);
    }
    fetchCustomers();
  }, []);

  // Delete customer
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    await fetch(`/api/customers/${id}`, {
      method: "DELETE",
    });

    // Refresh list after deletion
    setCustomers(customers.filter((c) => c._id !== id));
  };

  return (
    <div>
      <h2>Customer List</h2>
      <Link href="/customers/create">
        <button style={{ marginBottom: "10px" }}>+ Add Customer</button>
      </Link>

      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.city}</td>
                <td>{customer.country}</td>
                <td>
                  <Link href={`/customers/${customer._id}`}>
                    <button>View / Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(customer._id)}
                    style={{ marginLeft: "5px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
