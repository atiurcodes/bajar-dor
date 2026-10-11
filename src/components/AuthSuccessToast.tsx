"use client";

import { useEffect, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AuthSuccessToast() {
    const { data: session, isPending } = useSession();
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (isPending || !session || hasShownToast.current) return;

        const provider = sessionStorage.getItem("social-auth-pending");

        if (provider) {
            sessionStorage.removeItem("social-auth-pending");
            hasShownToast.current = true;

            toast.success(
                `${provider === "google" ? "Google" : "GitHub"} সফলভাবে লগইন হয়েছে`
            );
        }
    }, [session, isPending]);

    return null;
}