import { NextResponse } from "next/server";

export const errorHandler = (status, message) => {
    console.log(status)
    console.log(message)
    return NextResponse.json({
        success: false,
        status,
        message,
    });
};
