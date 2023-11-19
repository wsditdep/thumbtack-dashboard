import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        return NextResponse.json({
            status: 201,
            success: true,
            serverStatus: "OK",
            running: "Yes",
            message: "Feached....loading"
        });
    } catch (error) {
        return NextResponse.json({
            status: 404,
            success: false,
            message: "Loading...error!"
        });
    }
}