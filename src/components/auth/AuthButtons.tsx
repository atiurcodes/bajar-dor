"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { UserRound, LogOut, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const AuthButtons = () => {
    const { data: session, isPending } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleSignOut = async () => {
        try {
            const { error } = await signOut();

            if (error) {
                toast.error(error.message || "Sign out করা যায়নি!");
                return;
            }

            setIsOpen(false);
            toast.success("সফলভাবে Sign out হয়েছে!");
            router.replace("/sign-in");
        } catch (error) {
            const errorText =
                error instanceof Error
                    ? error.message
                    : "Sign out করতে সমস্যা হয়েছে!";

            toast.error(errorText);
            console.error("Sign out failed:", error);
        }
    };

    if (isPending) {
        return (
            <div
                className="flex items-center gap-2 sm:gap-3"
                aria-label="Authentication loading"
            >
                <div className="h-9 w-16 animate-pulse rounded-lg bg-gray-100 sm:h-10 sm:w-20" />
                <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-100 sm:h-10 sm:w-24" />
            </div>
        );
    }

    if (session) {
        const user = session.user;
        const firstLetter =
            user.name?.trim().charAt(0).toUpperCase() || "U";

        return (
            <div className="relative min-w-0" ref={dropdownRef}>
                {/* User Profile Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-label="User menu"
                    className="flex max-w-full min-w-0 items-center gap-1 rounded-xl px-1.5 py-2 transition hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:gap-2 sm:px-2"
                >
                    {/* Avatar */}
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 sm:size-10 sm:text-lg">
                        {firstLetter}
                    </span>

                    {/* User Name */}
                    <span className="max-w-16 truncate text-sm font-medium text-gray-800 sm:max-w-36 sm:text-base">
                        {user.name || "User"}
                    </span>

                    <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={`shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-[min(18rem,calc(100vw-1rem))] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl sm:mt-3 sm:w-72">
                        {/* User Information */}
                        <div className="border-b border-gray-100 px-3 py-3 sm:px-4 sm:py-4">
                            <p className="truncate font-semibold text-gray-900">
                                {user.name || "User"}
                            </p>

                            <p className="mt-1 break-all text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>

                        {/* Dropdown Actions */}
                        <div className="space-y-1 p-2">
                            <Link
                                href="/profile"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700 focus-visible:outline-2 focus-visible:outline-green-600"
                            >
                                <UserRound
                                    size={20}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                                <span>আমার প্রোফাইল</span>
                            </Link>

                            <button
                                type="button"
                                onClick={handleSignOut}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-500"
                            >
                                <LogOut size={19} aria-hidden="true" />
                                <p>সাইন আউট</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Logged-out UI
    return (
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <Link
                href="/sign-in"
                className="whitespace-nowrap rounded-lg border border-green-600 px-2.5 py-2 text-xs font-medium text-green-700 transition hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:px-4 sm:text-base"
            >
                সাইন ইন
            </Link>

            <Link
                href="/sign-up"
                className="whitespace-nowrap rounded-lg bg-green-600 px-2.5 py-2 text-xs font-medium text-white transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:px-4 sm:text-base"
            >
                সাইন আপ
            </Link>
        </div>
    );
};

export default AuthButtons;
