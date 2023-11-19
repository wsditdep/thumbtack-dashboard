import mongoose from "mongoose";

const schema = new mongoose.Schema({
    notice: {
        type: String,
        required: true,
        default: "nodata",
    }
}, { timestamps: true });

mongoose.models = {};

export const Notice = mongoose.model("Notice", schema);