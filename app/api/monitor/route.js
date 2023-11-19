import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import { History } from "@/model/History";
import { User } from "@/model/User";

export async function GET(req) {
    try {
        await connectDB();

        const searchParams = req.nextUrl.searchParams;
        const pageNumber = searchParams.get("pageNumber") ?? 1;
        const pageSize = searchParams.get("pageSize") ?? 12;
        let historyType = searchParams.get("historyType") ?? "all";

        var history;
        var docs;
        if (historyType === "all") {
            docs = await History.find().count();
            history = await History.find()
                .select("-notification -journeyHistory")
                .sort({ createdAt: -1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);
        } else {
            docs = await History.find({ historyType: historyType }).count();
            history = await History.find({ historyType: historyType })
                .select("-notification -journeyHistory")
                .sort({ createdAt: -1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);
        }

        const allUser = await User.find().count();
        const user = await User.find({ role: "user" }).count();
        const practice = await User.find({ role: "practice" }).count();
        const admin = await User.find({ role: "admin" }).count();
        const superAdmin = await User.find({ role: "superAdmin" }).count();

        const totalPages = Math.ceil(docs / pageSize);

        return NextResponse.json({
            status: 201,
            success: true,
            message: `History fetched successfully`,
            data: {
                history,
                allUser: allUser,
                adminCount: admin,
                superAdminCount: superAdmin,
                userCount: user,
                practiceCount: practice,
            },
            totalPages: totalPages
        });

    } catch (error) {

        return NextResponse.json({
            status: 500,
            success: false,
            error: "Error while fetching history!",
            errorMessage: error,
        });

    }
}

