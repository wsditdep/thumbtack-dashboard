import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        default: 993
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    refCode: {
        type: String,
        required: true,
        unique: true,
    },
    adminRefCode: {
        type: String,
        default: "null",
    },
    accountStatus: {
        type: String,
        required: true,
        default: "active"
    },
    accountLevel: {
        type: String,
        required: true,
        default: "Bronze"
    },
    accountBalance: {
        type: Number,
        required: true,
        default: 0
    },
    accountCommission: {
        type: Number,
        required: true,
        default: 0
    },
    connectedAccount: {
        type: String,
        required: true,
        default: "null",
    },
    withdrawalPin: {
        type: Number,
        required: true,
        default: 0
    },
    withdrawalAddress: {
        type: String,
        required: true,
        default: "null"
    },
    withdrawalName: {
        type: String,
        required: true,
        default: "null"
    },
    withdrawalResponse: {},
    networkType: {
        type: String,
        required: true,
        default: "TRC200"
    },
    journey: [],
    journey_status: {
        type: String,
        required: true,
        default: "initial"
    },
    journeyCurrentStage: {
        type: Number,
        required: true,
        default: 0
    },
    journeyMaxStage: {
        type: Number,
        required: true,
        default: 40
    },
    pointCommission: {
        type: Number,
        required: true,
        default: 1,
    },
    rangeValueMin: {
        type: Number,
        required: true,
        default: 30
    },
    rangeValueMax: {
        type: Number,
        required: true,
        default: 60
    },
    creditScore: {
        type: Number,
        required: true,
        default: 6
    },
    journeyHistory: [],
    notification: [],
    securityCode: {
        type: String,
        required: true,
        unique: true,
    },

}, { timestamps: true });

mongoose.models = {};

export const User = mongoose.model("User", schema);