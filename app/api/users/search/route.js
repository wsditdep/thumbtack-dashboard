import { User } from "@/model/User";
import { connectDB } from "@/utils/database";
import { errorHandler } from "@/utils/error";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();

        const { searchQuery, authenticatedUser } = await req.json();


        const authenticated = await User.findById(authenticatedUser?._id);
        const ref = authenticated.refCode;
        const refRole = authenticatedUser.role;

        var users;
        if (refRole === "superAdmin") {
            users = await User.find(
                {
                    $and: [
                        { "role": { $in: ["user", "practice"] } },
                        {
                            $or: [
                                { "username": { $regex: searchQuery, $options: "i" } },
                                { "role": { $regex: searchQuery, $options: "i" } },
                                { "adminRefCode": { $regex: searchQuery, $options: "i" } },
                                { "refCode": { $regex: searchQuery, $options: "i" } },
                            ]
                        },
                    ]
                }
            ).sort({ createdAt: -1 });
        } else {
            users = await User.find(
                {
                    "adminRefCode": ref,
                    $and: [
                        { "role": { $in: ["user", "practice"] } },
                        {
                            $or: [
                                { "username": { $regex: searchQuery, $options: "i" } },
                                { "role": { $regex: searchQuery, $options: "i" } },
                                { "adminRefCode": { $regex: searchQuery, $options: "i" } },
                                { "refCode": { $regex: searchQuery, $options: "i" } },
                            ]
                        },
                    ]
                }
            ).sort({ createdAt: -1 });
        }


        const reversedData = users.reverse();

        if (!reversedData) return errorHandler(404, "Data not found!")

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Process completed!",
            data: reversedData
        });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while searching the user!",
            errorMessage: error,
        });
    }
}