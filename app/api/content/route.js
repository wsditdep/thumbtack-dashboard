import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import { errorHandler } from "@/utils/error";
import { Content } from "@/model/Content";

export async function GET() {
    try {
        await connectDB();

        const content = await Content.find();

        return NextResponse.json({
            status: 201,
            success: true,
            data: content
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error fetching the content!",
            errorMessage: error,
        });
    }
}

export async function POST(req) {
    try {
        await connectDB();

        const { title, description } = await req.json();

        if (!title || !description) return errorHandler(404, "Provide the notice!");

        await Content.create({
            title,
            description
        });

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Content created successfully!"
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while creating the content!",
            errorMessage: error,
        });

    }
}

export async function PUT(req) {
    try {
        await connectDB();

        const { id, title, description } = await req.json();

        if (!id, !title || !description) return errorHandler(404, "Provide the notice!");

        await Content.findByIdAndUpdate(id, {
            title,
            description
        });

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Content updated successfully!"
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while creating the content!",
            errorMessage: error,
        });

    }
}

export async function DELETE(req) {
    try {
        await connectDB();

        const { id } = await req.json();

        if (!id) return errorHandler(404, "Data not found!");

        await Content.findByIdAndDelete(id);

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Content deleted successfully!"
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while creating the content!",
            errorMessage: error,
        });

    }
}
