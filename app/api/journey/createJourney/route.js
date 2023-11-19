import { NextResponse } from "next/server";
import { errorHandler } from "@/utils/error";
import { connectDB } from "@/utils/database";
import { User } from "@/model/User";
import { Commission } from "@/model/Commission";

export async function POST(req) {
    try {
        await connectDB();

        const { id, userJourney, journeyMaxStage, pointCommission } = await req.json();

        if (!id) return errorHandler(404, "User not found");

        await User.findByIdAndUpdate(id, {
            pointCommission: pointCommission,
        }, { new: true, runValidators: true, useFindAndModify: false });

        const user = await User.findOne({ _id: id });

        if (!user) return errorHandler(404, "User not found");

        const commission = await Commission.findOne({ commissionName: user.accountLevel });
        var userCommission = commission.commissionValue;

        var updatedUserJourney;
        if (user.pointCommission === null) {
            updatedUserJourney = userJourney.map(item => ({
                ...item,
                commission: item?.product?.productPrice * userCommission
            }));
        } else {
            updatedUserJourney = userJourney.map(item => ({
                ...item,
                commission: item?.product?.productPrice * user.pointCommission
            }));
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            journeyMaxStage: journeyMaxStage,
            pointCommission: pointCommission,
            journey: updatedUserJourney
        }, { new: true, runValidators: true, useFindAndModify: false });

        return NextResponse.json({
            status: 201,
            success: true,
            message: "User journey has been saved!",
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
