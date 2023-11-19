"use client";

import Link from "next/link";
import { Logout } from "../client/Client";
import { useSession } from "next-auth/react";
import Notice from "../suboperation/Notice";
import { useState } from "react";
import PopNotice from "../suboperation/PopNotice";

const SideBar = ({ notice, popNotice, authenticatedUser }) => {

    const { data: session } = useSession();

    const [isNotice, setIsNotice] = useState(false);
    const [isPopNotice, setIsPopNotice] = useState(false);

    return (
        <>
            <div className="admin-dashboard-childs">
                <div className="sidebar-wrapper">
                    <div className="version-controls">
                        <h3>Control Panel</h3>
                    </div>
                    <div className="sidebar-profile">
                        <div className="submenu-wrappwr">
                            <div className="profile-submenu">
                                <i className="fa fa-ellipsis-v"></i>
                            </div>
                        </div>
                        <div className="profile-image">
                            <div className="my-profile-wrap">
                                <h2>{session?.user?.username[0].toUpperCase()}</h2>
                            </div>
                            <p>{session?.user?.username}</p>
                            <span className="mt2">{session?.user?.role}</span>
                        </div>
                    </div>
                    <div className="dashboard-menu">
                        <ul>
                            <p>DASHBOARD</p>
                            <Link href="/dashboard/landing/index">
                                <li>
                                    <i className="fa fa-home"></i>Home
                                </li>
                            </Link>
                        </ul>
                        <ul>
                            <p>MANAGEMENT</p>
                            <Link href="/dashboard/users/index">
                                <li>
                                    <i className="fa fa-users"></i>Users
                                </li>
                            </Link>
                            <Link href="/dashboard/admin/index">
                                <li>
                                    <i className="fa fa-user"></i>Agents
                                </li>
                            </Link>
                            <Link href="/dashboard/product/index">
                                <li>
                                    <i className="fa fa-box"></i>Products
                                </li>
                            </Link>
                            <Link href="/dashboard/commission/index">
                                <li>
                                    <i className="fa fa-share"></i>Commission
                                </li>
                            </Link>
                        </ul>
                        <ul>
                            <p>WITHDRAWAL</p>
                            <Link href="/dashboard/withdrawal/index">
                                <li>
                                    <i className="fa fa-exchange"></i>Withdrawal Request
                                </li>
                            </Link>
                        </ul>
                        {
                            authenticatedUser?.role === "superAdmin"
                                ?
                                <ul>
                                    <p>ADVANCE MONITOR</p>
                                    <Link href="/dashboard/amfeature/index">
                                        <li>
                                            <i className="fa fa-laptop"></i>AM-Feature
                                        </li>
                                    </Link>
                                </ul>
                                :
                                <></>
                        }
                        <ul>
                            <p>NOTIFICATIONS</p>
                            <li onClick={() => setIsPopNotice(true)}>
                                <i className="fa fa-comment-alt"></i>Popup Notification
                            </li>
                            <li onClick={() => setIsNotice(true)}>
                                <i className="fa fa-table"></i>Notice   
                            </li>
                        </ul>
                        <ul>
                            <p>CONTENT</p>
                            <Link href="/dashboard/content/index">
                                <li>
                                    <i className="fa fa-book"></i>Manage Content
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="side-bar-footer">
                        <div className="sidebar-footer-parent">
                            <div className="sidebar-footer-childs">
                                <Link href={"/dashboard/system/index"}>
                                    <button className="cursor-pointer"><div className="active-animation"></div><i className="fa fa-info"></i></button>
                                </Link>
                            </div>
                            <div className="sidebar-footer-childs">
                                <Logout icon="fa fa-power-off" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* suboperation::begin */}
                {isNotice ? <Notice notice={notice} setIsNotice={setIsNotice} /> : <></>}
                {isPopNotice ? <PopNotice notice={popNotice} setIsPopNotice={setIsPopNotice} /> : <></>}
                {/* suboperation::end */}
            </div>
        </>
    )
}

export default SideBar;