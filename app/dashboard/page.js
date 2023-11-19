import SideBar from "@/components/sideBar/SideBar";
import Image from "next/image";
import ai_profile from "@/public/ai_profile.gif";
import { globalLink } from "@/utils/globalLink";
import Link from "next/link";
import { LogoutFunction } from "@/components/client/Client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const fetchNotice = async () => {
    try {
        const res = await fetch(`${globalLink}/api/notice`, {
            cache: "no-store",
            method: "GET"
        });

        const data = await res.json();

        if (!data.success) return [];

        return data.data;
    } catch (error) {
        console.log(error);
    }
}

const fetchPopNotice = async () => {
    try {
        const res = await fetch(`${globalLink}/api/popNotice`, {
            cache: "no-store",
            method: "GET"
        });

        const data = await res.json();

        if (!data.success) return [];

        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export default async function DashboardLading({ children }) {

    const { user } = await getServerSession(authOptions);

    const notice = await fetchNotice();
    const popNotice = await fetchPopNotice();

    return (
        <>
            <section className="admin-dashboard-section">
                <div className="admin-dashboard-parent">
                    <SideBar notice={notice} popNotice={popNotice} authenticatedUser={user} />
                    <div className="admin-dashboard-childs">
                        <div className="dashboard-top-navigation">
                            <div className="dashboard-top-navigation-parent">
                                <div className="dashboard-top-navigation-childs">
                                    <div className="top-navigation-btns">
                                        <div className="navigation-btns-childs">
                                            <Link href={"/dashboard/landing/index"}>
                                                <button className="d-btn d-btn-primary">Reports</button>
                                            </Link>
                                        </div>
                                        <div className="navigation-btns-childs">
                                            <Link href={"/dashboard/users/index"}>
                                                <button className="d-btn d-btn-primary">List Users</button>
                                            </Link>
                                        </div>
                                        <div className="navigation-btns-childs">
                                            <Link href={"/dashboard/withdrawal/index"}>
                                                <button className="d-btn d-btn-primary">Withdrawal Request</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard-top-navigation-childs">
                                    <div className="dashboard-top-navigation-functions">
                                        <div className="dashboard-top-navigation-functions-childs">
                                            <Link href={"/dashboard/withdrawal/index"}>
                                                <button><div className="active-animation"></div><i className="fa fa-bell"></i></button>
                                            </Link>
                                        </div>
                                        <div className="dashboard-top-navigation-functions-childs">
                                            <Link href={"/dashboard/content/index"}>
                                                <button><i className="fa fa-book"></i></button>
                                            </Link>
                                        </div>
                                        <div className="dashboard-top-navigation-functions-childs">
                                            <div className="top-profile-image">
                                                <Image
                                                    src={ai_profile}
                                                    alt="profile"
                                                    height={100}
                                                    width={100}
                                                    draggable={false}
                                                />
                                                <div className="profile-sub-operations">
                                                    <LogoutFunction />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </section>
        </>
    );
}
