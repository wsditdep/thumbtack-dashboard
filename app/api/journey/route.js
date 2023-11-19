import { NextResponse } from "next/server";
import { errorHandler } from "@/utils/error";
import { connectDB } from "@/utils/database";
import { User } from "@/model/User";
import { Product } from "@/model/Product";

export async function POST(req) {
    try {
        await connectDB();

        const { id } = await req.json();

        const user = await User.findOne({ _id: id });

        if (!user) return errorHandler(404, "User not found");

        if (user.accountBalance <= 0) return errorHandler(201, "Please recharge, insufficient balance!");

        const pipeline = [
            {
                "$match": { "productPrice": { "$lte": user.accountBalance } }
            },
            {
                "$sample": { "size": 1 } // Adjust the size as needed
            }
        ];

        const random_documents = await Product.aggregate(pipeline);
        
        

        return NextResponse.json({
            status: 201,
            success: true,
            random_documents
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
