// filepath: /c:/Users/rj/OneDrive/Desktop/Next/Awadh Attar/awadh-attar/models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);