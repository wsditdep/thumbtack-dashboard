"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider({ children }) {
    return (
        <>
            {children}
            <Toaster />
        </>
    )
}
