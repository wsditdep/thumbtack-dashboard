import mongoose from "mongoose";

const schema = new mongoose.Schema({
    historyMessage: {
        type: String,
        required: true,
        default: "null"
    },
    historyType: {
        type: String,
        required: true,
        default: "null"
    },
    historyStatus: {
        type: String,
        required: true,
        default: "null"
    },
    sender: {
        type: String,
        required: true,
        default: "null"
    },
    receiver: {
        type: String,
        required: true,
        default: "null"
    }
}, { timestamps: true });

mongoose.models = {};

export const History = mongoose.model("History", schema);