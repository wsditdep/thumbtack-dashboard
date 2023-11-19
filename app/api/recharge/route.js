import { NextResponse } from "next/server";
import { User } from "@/model/User";
import { errorHandler } from "@/utils/error";
import { connectDB } from "@/utils/database";
import { History } from "@/model/History";

export async function POST(req) {
    try {
        await connectDB();

        const { id, processType, balance, authenticatedUser } = await req.json();

        if (!id || !processType) return errorHandler(404, "Required field is missing, try again!");

        const isUser = await User.findOne({ _id: id });

        if (!isUser) return errorHandler(404, "Invalid details, try again!");

        let previousBalance = isUser.accountBalance;
        let newBalance;
        let message;

        let historyMsg;
        let historyStatus;


        if (processType === "credit") {
            newBalance = previousBalance + Number(balance);
            message = `${isUser.username} account has credited by $${balance}.`

            historyMsg = `${authenticatedUser.username} has credited $${balance} to ${isUser.username}`;
            historyStatus = "credited"
        }

        if (processType === "debit") {
            newBalance = previousBalance - Number(balance);
            message = `${isUser.username} account has debited by $${balance}.`

            historyMsg = `${authenticatedUser.username} has debited $${balance} from ${isUser.username}`;
            historyStatus = "debited"
        }

        await User.findByIdAndUpdate(id, {
            accountBalance: newBalance
        });

        await History.create({
            historyMessage: historyMsg,
            historyType: "transaction",
            historyStatus: historyStatus,
            sender: authenticatedUser.username,
            receiver: isUser.username
        })

        return NextResponse.json({
            status: 201,
            success: true,
            message
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while recharge!",
            errorMessage: error,
        });

    }
}