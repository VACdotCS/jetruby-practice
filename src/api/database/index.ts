import * as mongoose from "mongoose";

export const connectDB = async () => {
    if (!process.env.DB_URI) {
        throw new Error("MongoDB URI is missing, check env variables");
    }

    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('✅ MongoDB Connected!');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }
};
