"use client";

import Image from "next/image";
import ai from "@/public/ai.png";
import { useEffect, useState } from "react";

const System = () => {
    const [dataSpeet, setDataSpeed] = useState("calculating.....");
    const [proxy, setProxy] = useState("Switching.....");

    const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Argentina",
        "Australia",
        "Brazil",
        "Canada",
        "China",
        "Egypt",
        "France",
        "Germany",
        "India",
        "Italy",
        "Japan",
        "Mexico"
    ];

    const manageProxy = () => {
        const randomIndex = Math.floor(Math.random() * countries.length);
        const c = countries[randomIndex];
        setProxy(c);
        return;
    }

    const generateRandomNumber = () => {
        const min = 800;
        const max = 1000;
        const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        setDataSpeed(newRandomNumber);
    };

    useEffect(() => {
        generateRandomNumber();
        manageProxy();
    }, []);
    return (
        <>
            <div className="system-info">
                <div className="system-info-childs">
                    <ul>
                        <li>Active Users: <span>5555</span></li>
                        <li>Security: <span>Protect by AI</span></li>
                        <li>Security Status: <span>High</span></li>
                        <li>Vulerability Detected: <span>No</span></li>
                        <li>Firewall: <span>Active</span></li>
                        <li>Network Speed: <span>{dataSpeet} MB/SEC</span></li>
                        <li>Network Zone: <span>Proxy (Change Network Zone Automatically)</span></li>
                        <li>Current Location: <span>{proxy}</span></li>
                        <li>Current IP Address: <span>********* (Confidential)</span></li>
                    </ul>
                </div>
                <div className="system-info-childs">
                    <Image
                        src={ai}
                        alt="ai"
                        height={100}
                        width={100}
                        draggable={false}
                        unoptimized={true}
                    />
                </div>
            </div>
        </>
    )
}

export default System;