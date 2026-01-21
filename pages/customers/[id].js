import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomerForm from "../../components/CustomerForm";

export default function CustomerDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState(null);

  // Fetch customer by ID
  useEffect(() => {
    if (!id) return;
    async function fetchCustomer() {
      const res = await fetch(`/api/customers/${id}`);
      const data = await res.json();
      setCustomer(data);
    }
    fetchCustomer();
  }, [id]);

  // Update customer
  const handleUpdate = async (formData) => {
    await fetch(`/api/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert("Customer updated successfully!");
    router.push("/customers");
  };

  // Delete customer
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    await fetch(`/api/customers/${id}`, { method: "DELETE" });
    alert("Customer deleted successfully!");
    router.push("/customers");
  };

  if (!customer) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Customer</h1>
      <CustomerForm onSubmit={handleUpdate} initialData={customer} />
      <button
        onClick={handleDelete}
        style={{ marginTop: "10px", background: "red", color: "white" }}
      >
        Delete Customer
      </button>
    </div>
  );
}
