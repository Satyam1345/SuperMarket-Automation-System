import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('supermarket'); // Adjust database name as needed
  const collection = db.collection('commodities');

  if (req.method === 'GET') {
    // Fetch all commodities
    try {
      const commodities = await collection.find({}).toArray();
      res.status(200).json(commodities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch commodities' });
    }
  } else if (req.method === 'POST') {
    // Add a new commodity
    try {
      const { name, price, quantity } = req.body;

      // Validate input
      if (!name || price == null || quantity == null) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const result = await collection.insertOne({ name, price, quantity });
      const newCommodity = await collection.findOne({ _id: result.insertedId });
      res.status(201).json(newCommodity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add commodity' });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
