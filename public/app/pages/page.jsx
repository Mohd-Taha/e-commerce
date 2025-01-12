// filepath: /c:/Users/rj/OneDrive/Desktop/Next/Awadh Attar/awadh-attar/pages/api/products.js
import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('your-database-name');

    switch (req.method) {
        case 'GET':
            const products = await db.collection('products').find({}).toArray();
            res.json(products);
            break;
        case 'POST':
            const product = req.body;
            await db.collection('products').insertOne(product);
            res.json({ message: 'Product added successfully' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
}