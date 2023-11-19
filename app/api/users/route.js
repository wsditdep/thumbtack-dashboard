import { User } from "@/model/User";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";
import generateReferralCode from "@/utils/generateRefCode";
import { errorHandler } from "@/utils/error";
import bcrypt from "bcryptjs";
import generateSecurityCode from "@/utils/generateSecurityCode";
import { History } from "@/model/History";

export async function GET(req) {

    try {
        await connectDB();

        const searchParams = req.nextUrl.searchParams;
        const pageNumber = searchParams.get("pageNumber") ?? 1;
        const pageSize = searchParams.get("pageSize") ?? 20;
        const authenticatedID = searchParams.get("authUser") ?? "null";

        if (authenticatedID === "null") {
            return NextResponse.json({
                status: 500,
                success: false,
                message: "Access Denied!"
            });
        }

        const usersDocs = await User.find(
            {
                $or: [
                    { "role": { "$in": ["user", "practice"] } },
                ]
            }
        ).select("-notification -journeyHistory").count();

        const authenticatedUser = await User.findById(authenticatedID);
        const ref = authenticatedUser.refCode;
        const refRole = authenticatedUser.role;

        // const users = await User.find(
        //     {
        //         $or: [
        //             { "role": { "$in": ["user", "practice"] } },
        //         ]
        //     }
        // )
        //     .select("-notification -journeyHistory")
        //     .sort({ createdAt: -1 })
        //     .skip((pageNumber - 1) * pageSize)
        //     .limit(pageSize);


        var users;
        if (refRole === "superAdmin") {
            users = await User.find({
                "role": { "$in": ["user", "practice"] }
            })
                .select("-notification -journeyHistory")
                .sort({ createdAt: -1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);
        } else {
            users = await User.find({
                "adminRefCode": ref,
                "role": { "$in": ["user", "practice"] }
            })
                .select("-notification -journeyHistory")
                .sort({ createdAt: -1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);
        }

        const totalPages = Math.ceil(usersDocs / pageSize);

        return NextResponse.json({
            status: 201,
            success: true,
            data: users,
            totalPages: totalPages
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

export async function PUT(req) {
    try {
        await connectDB();

        const {
            id,
            username,
            phone,
            accountStatus,
            accountLevel,
            accountBalance,
            accountCommission,
            password,
            withdrawalPin,
            withdrawalAddress,
            rangeValueMin,
            rangeValueMax,
            creditScore,
            authenticatedUser
        } = await req.json();

        if (!id) return errorHandler(404, "Required field is missing, try again!");

        const isUser = await User.findOne({ _id: id }).select();

        if (!isUser) return errorHandler(404, "User not found!");

        if (accountBalance !== isUser.accountBalance) {
            await History.create({
                historyMessage: `${authenticatedUser.username} has edited acc. balance of ${isUser.username} to $'${accountBalance}'`,
                historyType: "edited",
                historyStatus: "changed",
                sender: authenticatedUser.username,
                receiver: isUser.username
            })
        }

        if (withdrawalPin !== isUser.withdrawalPin) {
            await History.create({
                historyMessage: `${authenticatedUser.username} has edited withdrawal PIN of ${isUser.username} to '${withdrawalPin}'`,
                historyType: "withdrawalpin",
                historyStatus: "changed",
                sender: authenticatedUser.username,
                receiver: isUser.username
            })
        }

        if (withdrawalAddress !== isUser.withdrawalAddress) {
            await History.create({
                historyMessage: `${authenticatedUser.username} has edited wallet address of ${isUser.username} to '${withdrawalAddress}'`,
                historyType: "walletaddress",
                historyStatus: "changed",
                sender: authenticatedUser.username,
                receiver: isUser.username
            })
        }

        var user;
        if (password) {
            const hasedPassword = await bcrypt.hash(password, 10);
            user = await User.findByIdAndUpdate(id, {
                username,
                phone,
                accountStatus,
                accountLevel,
                accountBalance,
                accountCommission,
                password: hasedPassword,
                withdrawalPin,
                withdrawalAddress,
                rangeValueMin,
                rangeValueMax,
                creditScore
            });

            await History.create({
                historyMessage: `${authenticatedUser.username} has changed password ${isUser.username} to '${password}'`,
                historyType: "password",
                historyStatus: "changed",
                sender: authenticatedUser.username,
                receiver: isUser.username
            })

        } else {
            user = await User.findByIdAndUpdate(id, {
                username,
                phone,
                accountStatus,
                accountLevel,
                accountBalance,
                accountCommission,
                withdrawalPin,
                withdrawalAddress,
                rangeValueMin,
                rangeValueMax,
                creditScore
            });
        }


        return NextResponse.json({
            status: 201,
            success: true,
            message: "Updated Successfully!",
            data: user
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while updating the user!",
            errorMessage: error,
        });
    }
}

export async function POST(req) {
    try {
        await connectDB();

        const { phone, username, password, withdrawalPassword, connectedAccount, adminRefCode } = await req.json();

        if (!connectedAccount || !adminRefCode || !phone || !username || !password || !withdrawalPassword) return errorHandler(404, "Required field is missing, try again!");

        const isUser = await User.findOne({ username });
        const isPhone = await User.findOne({ phone });

        if (isUser) return errorHandler(200, `${username} is already used. Please try with different username!`);
        if (isPhone) return errorHandler(200, `${phone} is already used. Please try with different username!`);

        const isValidRefcode = await User.findOne({ adminRefCode });
        if (!isValidRefcode) return errorHandler(200, "Invalid reference code");

        const isPracticeAccount = await User.findOne({ connectedAccount });
        if (isPracticeAccount) return errorHandler(200, `This user already have practice account, USERNAME - ${isPracticeAccount.username}`);

        const hasedPassword = await bcrypt.hash(password, 10);
        const refCode = await generateReferralCode();
        const securityCode = await generateSecurityCode()

        const user = await User.create({
            username,
            phone,
            password: hasedPassword,
            withdrawalPin: withdrawalPassword,
            role: "practice",
            adminRefCode,
            refCode,
            connectedAccount,
            securityCode
        });

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Practice Account Created Successfully!",
            data: user
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while creating the user!",
            errorMessage: error,
        });
    }
}