import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import { PopNotice } from "@/model/PopNotice";
import { errorHandler } from "@/utils/error";

export async function GET() {
    try {
        await connectDB();

        const notice = await PopNotice.find();

        return NextResponse.json({
            status: 201,
            success: true,
            data: notice
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error fetching the pop notice!",
            errorMessage: error,
        });
    }
}

export async function POST(req) {
    try {
        await connectDB();

        const { myNotice } = await req.json();

        if (!myNotice) return errorHandler(404, "Provide the notice!");

        await PopNotice.create({
            notice: myNotice
        });

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Notice saved successfully!!"
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while creating the pop notice!",
            errorMessage: error,
        });

    }
}

export async function PUT(req) {
    try {
        await connectDB();

        const { id, myNotice } = await req.json();

        if (!id) return errorHandler(404, "Notice not found!");
        if (!myNotice) return errorHandler(404, "Provide the notice!");

        await PopNotice.findByIdAndUpdate(id, {
            notice: myNotice
        });

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Notice updated successfully!"
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while updating the pop notice!",
            errorMessage: error,
        });

    }
}

