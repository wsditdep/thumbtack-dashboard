import { NextResponse } from "next/server";
import { errorHandler } from "@/utils/error";
import { connectDB } from "@/utils/database";
import { User } from "@/model/User";

export async function POST(req) {
    try {
        await connectDB();

        const { id } = await req.json();

        const user = await User.findOne({ _id: id });

        if (!user) return errorHandler(404, "User not found");

        const updatedUser = await User.findByIdAndUpdate(id, {
            journey_status: "initial",
            journeyCurrentStage: 0,
            journey: [],
            journeyHistory: [],
            notification: []
        }, { new: true, runValidators: true, useFindAndModify: false });

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Reset successfully",
            data: updatedUser,
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while reset user journey!",
            errorMessage: error,
        });

    }
}
