import mongoose from "mongoose";

const schema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
}, { timestamps: true });

mongoose.models = {};

export const Product = mongoose.model("Product", schema);