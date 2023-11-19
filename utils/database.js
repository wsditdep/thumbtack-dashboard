import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, { dbName: "platform" })
            .then(() => {
                console.log(`Database connected successfully`);
            })
    } catch (err) {
        console.error("Something went wrong connecting to database");
        console.error(err);
    }
}