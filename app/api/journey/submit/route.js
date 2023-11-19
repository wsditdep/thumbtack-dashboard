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

        // if (user.accountBalance) return errorHandler(201, "Please recharge, insufficient balance!");

        const isPendingProduct = user.journeyHistory.filter(obj => obj.status === "pending");
        const isPendingProductObject = isPendingProduct[0];

        if (!isPendingProductObject) return errorHandler(404, "Product not found!");

        if (user.accountBalance < isPendingProductObject.product.productPrice) return errorHandler(201, "Please recharge, insufficient balance!");

        // manage accountBalance::begin
        const deductedAmount = user.accountBalance - isPendingProductObject.product.productPrice;
        const includeCommission = deductedAmount + isPendingProductObject.commission
        // manage accountBalance::end

        const withoutPendingList = user.journeyHistory.filter(obj => obj.status !== "pending");
        const newObj = {
            ...isPendingProductObject,
            status: "completed"
        }

        const updateArray = [...withoutPendingList, newObj]

        const updatedUser = await User.findByIdAndUpdate(id, {
            accountBalance: includeCommission,
            journeyCurrentStage: user.journeyCurrentStage + 1,
            journeyHistory: updateArray
        }, { new: true, runValidators: true, useFindAndModify: false });

        return NextResponse.json({
            status: 201,
            success: true,
            data: updatedUser,
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while creating the product!",
            errorMessage: error,
        });

    }
}
