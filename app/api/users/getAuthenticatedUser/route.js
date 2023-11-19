import { User } from "@/model/User";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { errorHandler } from "@/utils/error";

export async function POST(req) {
    try {
        await connectDB();

        const { userId } = await req.json();

        if (!userId) return errorHandler(404, "User not found!");

        const users = await User.findById(userId).select("-notification -journeyHistory");

        return NextResponse.json({
            status: 201,
            success: true,
            data: users
        });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while fetching users!",
            errorMessage: error,
        });
    }
}