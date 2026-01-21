import dbConnect from "../../../lib/mongodb";
import Customer from "../../../modals/customer";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const customers = await Customer.find({});
    res.status(200).json(customers);
  } else if (req.method === "POST") {
    try {
      const customer = await Customer.create(req.body);
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).end();
  }
}
