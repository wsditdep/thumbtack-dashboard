import { User } from "@/model/User";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { errorHandler } from "@/utils/error";
import { History } from "@/model/History";

export async function GET() {
    try {
        await connectDB();

        const users = await User.find({
            $and: [
                { $or: [{ "role": "user" }, { "role": "practice" }] },
                { "withdrawalResponse.status": "pending" }
            ]
        }).select("-notification -journeyHistory");


        console.log(users)

        const reversedData = users.reverse();

        return NextResponse.json({
            status: 201,
            success: true,
            data: reversedData
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

export async function POST(req) {
    try {
        await connectDB();

        const { id, adminResponse, withdrawalAmount, authenticatedUser } = await req.json();

        if (!id || !adminResponse || !withdrawalAmount) return errorHandler(201, "Required field is missing!");

        const user = await User.findById(id);

        if (!user) return errorHandler(404, "User not found!");

        let message;
        let historyMsg;
        let historyStatus;
        if (adminResponse === "approved") {
            historyMsg = `${authenticatedUser.username} has approved the withdrawal $${withdrawalAmount} for ${user.username}`;
            message = "Withdrawal has been approved";
            historyStatus = "approved";
        }
        if (adminResponse === "rejected") {
            historyMsg = `${authenticatedUser.username} has rejected the withdrawal $${withdrawalAmount} for ${user.username}`;
            message = "Withdrawal has been rejected";
            historyStatus = "rejected";
        }

        await User.findByIdAndUpdate(id, {
            withdrawalResponse: {}
        });

        await History.create({
            historyMessage: historyMsg,
            historyType: "withdrawal",
            historyStatus: historyStatus,
            sender: authenticatedUser.username,
            receiver: user.username
        })

        return NextResponse.json({
            status: 200,
            success: true,
            message,
        });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while responding to user withdrawal request!",
            errorMessage: error,
        });
    }
}
