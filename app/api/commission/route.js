import { NextResponse } from "next/server";
import { errorHandler } from "@/utils/error";
import { connectDB } from "@/utils/database";
import { Commission } from "@/model/Commission";

export async function POST(req) {
    try {
        await connectDB();
        const { commissionName, commissionValue } = await req.json();

        if (!commissionName || !commissionValue) return errorHandler(404, "Required field is missing, try again!");

        const isExsit = await Commission.findOne({ commissionName });

        if (isExsit) return errorHandler(200, "The name of the commission is already in use. Please use other name and try again!");

        const commission = await Commission.create({
            commissionName,
            commissionValue
        });

        return NextResponse.json({
            status: 201,
            success: true,
            message: `'${commissionName}' created successfully`,
            data: commission
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while creating commission!",
            errorMessage: error,
        });

    }
}

export async function GET(req) {
    try {
        await connectDB();

        const commission = await Commission.find();

        return NextResponse.json({
            status: 201,
            success: true,
            message: `Commissions fetched successfully`,
            data: commission
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while fetching commission!",
            errorMessage: error,
        });

    }
}

export async function DELETE(req) {
    try {
        await connectDB();

        const { id } = await req.json();

        const commission = await Commission.findByIdAndDelete(id);

        return NextResponse.json({
            status: 201,
            success: true,
            message: `Commissions deleted successfully`,
            data: commission
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while deleting commission!",
            errorMessage: error,
        });

    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const { id, commissionName, commissionValue } = await req.json();

        if (!id || !commissionName || !commissionValue) return errorHandler(404, "Required field is missing, try again!");

        const commission = await Commission.findByIdAndUpdate(id, {
            commissionName,
            commissionValue
        });

        return NextResponse.json({
            status: 201,
            success: true,
            message: `Commission updated successfully!`,
            data: commission
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while updating commission!",
            errorMessage: error,
        });

    }
}