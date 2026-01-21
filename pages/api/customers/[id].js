import dbConnect from "../../../lib/mongodb";
import Customer from "../../../modals/customer";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const customer = await Customer.findById(id);
    res.status(200).json(customer);
  } else if (req.method === "PUT") {
    const customer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(customer);
  } else if (req.method === "DELETE") {
    await Customer.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
