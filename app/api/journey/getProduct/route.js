import { NextResponse } from "next/server";
import { errorHandler } from "@/utils/error";
import { connectDB } from "@/utils/database";
import { User } from "@/model/User";
import { Product } from "@/model/Product";
import { Commission } from "@/model/Commission";

export async function POST(req) {
    try {
        await connectDB();

        const { id } = await req.json();

        const user = await User.findOne({ _id: id });

        if (!user) return errorHandler(404, "User not found");

        if (user.accountBalance <= 0) return errorHandler(201, "Please recharge, insufficient balance!");

        // check pending product::begin
        const isPending = user?.journeyHistory.filter(obj => obj.status === "pending");
        if (isPending.length !== 0) {
            return NextResponse.json({
                status: 201,
                success: true,
                message: "Please complete this work",
                data: isPending[0],
            });
        }
        // check pending product::end 

        const pipeline = [
            {
                "$match": { "productPrice": { "$lte": user.accountBalance } }
            },
            {
                "$sample": { "size": 1 } // Adjust the size as needed
            }
        ];

        const random_documents_array = await Product.aggregate(pipeline);
        const random_documents_object = random_documents_array[0];

        if (!random_documents_object) return errorHandler(201, "Please recharge, insufficient balance!");

        // evaluation product price and accounBalance

        if (user.accountBalance < random_documents_object.price) return errorHandler(201, "Please recharge, insufficient balance!");

        // calculate commission::begin
        const commission = await Commission.findOne({ commissionName: user.accountLevel });
        const commissionValue = commission.commissionValue;
        
        const includeCommission = random_documents_object.productPrice * commissionValue;

        // calculate commission::end

        const updatedValue = {
            status: "pending",
            commission: includeCommission,
            product: random_documents_object,
        }

        const updateArray = [...user.journeyHistory, updatedValue]

        const updatedUser = await User.findByIdAndUpdate(id, {
            journeyHistory: updateArray
        }, { new: true, runValidators: true, useFindAndModify: false });

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Something",
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
