import { NextResponse } from "next/server";
import { User } from "@/model/User";
import { connectDB } from "@/utils/database";

export async function POST() {
    try {
        await connectDB();

        const allUser = await User.find().count();
        const user = await User.find({ role: "user" }).count();
        const practice = await User.find({ role: "practice" }).count();
        const admin = await User.find({ role: "admin" }).count();
        const superAdmin = await User.find({ role: "superAdmin" }).count();

        return NextResponse.json({
            status: 201,
            success: true,
            message: `Report generated successfully!`,
            data: {
                allUser: allUser,
                adminCount: admin,
                superAdminCount: superAdmin,
                userCount: user,
                practiceCount: practice,
            }
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while generating the report!",
            errorMessage: error,
        });

    }
}