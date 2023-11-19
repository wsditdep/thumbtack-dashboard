"use client";

import { signOut } from "next-auth/react";

export const Logout = ({ icon }) => {
    return <button className="cursor-pointer" onClick={() => signOut()}><i className={icon}></i></button>
}

export const LogoutFunction = () => {
    return <ul>
        <li onClick={() => signOut()}>Login <i className="fa fa-power-off"></i></li>
    </ul>
}
