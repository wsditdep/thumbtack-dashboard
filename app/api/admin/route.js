import { User } from "@/model/User";
import { connectDB } from "@/utils/database";
import { errorHandler } from "@/utils/error";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import generateReferralCode from "@/utils/generateRefCode";
import generateSecurityCode from "@/utils/generateSecurityCode";

export async function POST(req) {
    try {

        await connectDB();

        const { username, password, adminPassCode, role, walletAddress } = await req.json();

        if (!username || !password || !role || !adminPassCode || !walletAddress) return errorHandler(404, "Required field is missing, try again!");

        if (Number(adminPassCode) !== 7070) return errorHandler(200, "Incorrect Admin Passcode");

        let isUser = await User.findOne({ username });

        if (isUser) return errorHandler(200, `'${username}' username is already used, Please try with different username!`);

        const hasedPassword = await bcrypt.hash(password, 10);

        const refCode = await generateReferralCode();
        const securityCode = await generateSecurityCode();

        const user = await User.create({
            username,
            password: hasedPassword,
            role,
            refCode,
            withdrawalAddress: walletAddress,
            securityCode
        });

        console.log(user)

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Process completed successfully",
            data: user,
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while creating admin!",
            errorMessage: error,
        });

    }
}

export async function GET() {
    try {
        await connectDB();

        const users = await User.find(
            {
                $or: [
                    { "role": { "$in": ["admin", "superAdmin"] } },
                ]
            }
        )

        const reversedData = users.reverse();

        return NextResponse.json({
            status: 201,
            success: true,
            data: reversedData
        });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while fetching users!",
            errorMessage: error,
        });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();

        const { id } = await req.json();

        if (!id) return errorHandler(404, "User not found!");

        const deletedUser = await User.findByIdAndDelete(id);

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Deleted Successfully!",
            data: deletedUser
        });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while deleting users!",
            errorMessage: error,
        });
    }
}

export async function PUT(req) {
    try {
        await connectDB();

        const { id, accountStatus, role, password, walletAddress } = await req.json();
        console.log(walletAddress)

        if (!id || !accountStatus || !role || !walletAddress) return errorHandler(201, "Required field is missing!");

        const user = await User.findById(id);

        if (!user) return errorHandler(404, "User not found!");

        const securityNewCode = await generateSecurityCode();

        if (password !== "") {
            var hasedPassword = await bcrypt.hash(password, 10);

            const updatedUser = await User.findByIdAndUpdate(id, {
                accountStatus: accountStatus,
                role: role,
                password: hasedPassword,
                withdrawalAddress: walletAddress,
                securityCode: securityNewCode //added
            })

            return NextResponse.json({
                status: 201,
                success: true,
                message: "Updated Successfully!",
                data: updatedUser
            });
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            accountStatus: accountStatus,
            role: role,
            withdrawalAddress: walletAddress
        })

        console.log(updatedUser)

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Updated Successfully!",
            data: updatedUser
        });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while u  users!",
            errorMessage: error,
        });
    }
}