import { NextResponse } from "next/server";
import { errorHandler } from "@/utils/error";
import { connectDB } from "@/utils/database";
import { Product } from "@/model/Product";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        await connectDB();

        const { productName, productPrice, cloud_public_id, cloud_url } = await req.json();

        if (!productName || !productPrice || !cloud_public_id || !cloud_url) return errorHandler(404, "Required field is missing, try again!");

        const product = await Product.create({
            productName,
            productPrice,
            public_id: cloud_public_id,
            url: cloud_url
        });

        return NextResponse.json({
            status: 201,
            success: true,
            message: `'${productName}' created successfully!`,
            data: product
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

export async function GET() {
    try {
        await connectDB();

        const product = await Product.find();

        return NextResponse.json({
            status: 201,
            success: true,
            message: `Products fetched successfully`,
            data: product
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

export async function DELETE(req) {
    try {
        await connectDB();

        const { _id, cloud_public_id } = await req.json();

        if (!_id || !cloud_public_id) return errorHandler(404, "Required field is missing, try again!");

        const isProduct = await Product.findOne({ _id });
        if (!isProduct) return errorHandler(404, "Not found!");

        try {
            await cloudinary.v2.uploader.destroy(cloud_public_id);

            var product = await Product.findByIdAndDelete(_id);

        } catch (error) {
            return errorHandler(404, "Error while deleting a product!");
        }

        return NextResponse.json({
            status: 201,
            success: true,
            message: `'${isProduct.productName}' deleted successfully`,
            data: product
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while deleting a product!",
            errorMessage: error,
        });

    }
}