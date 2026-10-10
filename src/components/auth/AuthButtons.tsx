"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { UserRound } from "lucide-react";
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

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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
            <div className="flex items-center gap-3">
                <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-100" />
                <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-100" />
            </div>
        );
    }

    if (session) {
        const user = session.user;
        const firstLetter = user.name?.trim().charAt(0).toUpperCase() || "U";

        return (
            <div className="relative" ref={dropdownRef}>
                {/* User Profile Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className="flex items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-green-50"
                >
                    {/* Avatar */}
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-700">
                        {firstLetter}
                    </span>

                    {/* User Name */}
                    <span className="max-w-36 truncate font-medium text-gray-800">
                        {user.name}
                    </span>

                    {/* Down Arrow */}
                    <svg
                        className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""
                            }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.09 1.03l-4.25 4.5a.75.75 0 01-1.09 0l-4.25-4.5a.75.75 0 01.02-1.05z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                        {/* User Information */}
                        <div className="border-b border-gray-100 px-4 py-4">
                            <p className="truncate font-semibold text-gray-900">
                                {user.name}
                            </p>

                            <p className="mt-1 truncate text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>

                        {/* Dropdown Actions */}
                        <div className="space-y-1 p-2">
                            <Link
                                href="/profile"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                            >
                                <UserRound size={20} strokeWidth={1.8} />
                                <span>আপনার প্রোফাইল</span>
                            </Link>

                            <button
                                type="button"
                                onClick={handleSignOut}
                                className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Logged-out UI
    return (
        <div className="flex items-center gap-3">
            <Link
                href="/sign-in"
                className="rounded-lg border border-green-600 px-4 py-2 text-green-700 transition hover:bg-green-50"
            >
                সাইন ইন
            </Link>

            <Link
                href="/sign-up"
                className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
            >
                সাইন আপ
            </Link>
        </div>
    );
};

export default AuthButtons;
