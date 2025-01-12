// filepath: /c:/Users/rj/OneDrive/Desktop/Next/Awadh Attar/awadh-attar/pages/api/products/index.js
import connectToDatabase from '../../../utils/mongoose';
import Product from '../../../models/products';

export default async function handler(req, res) {
    await connectToDatabase();

    try {
        switch (req.method) {
            case 'GET':
                const products = await Product.find({});
                res.status(200).json(products);
                break;
            case 'POST':
                const product = new Product(req.body);
                await product.save();
                res.status(201).json({ message: 'Product added successfully' });
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
                break;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}