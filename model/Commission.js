import mongoose from "mongoose";

const schema = new mongoose.Schema({
    commissionName: {
        type: String,
        required: true,
    },
    commissionValue: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

mongoose.models = {};

export const Commission = mongoose.model("Commission", schema);