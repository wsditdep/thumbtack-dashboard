import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import { Notice } from "@/model/Notice";
import { errorHandler } from "@/utils/error";

export async function GET() {
    try {
        await connectDB();

        const notice = await Notice.find();

        return NextResponse.json({
            status: 201,
            success: true,
            data: notice
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error fetching the notice!",
            errorMessage: error,
        });
    }
}

export async function POST(req) {
    try {
        await connectDB();

        const { myNotice } = await req.json();

        if (!myNotice) return errorHandler(404, "Provide the notice!");

        await Notice.create({
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
            error: "Error while creating the notice!",
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

        await Notice.findByIdAndUpdate(id, {
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
            error: "Error while updating the notice!",
            errorMessage: error,
        });

    }
}

