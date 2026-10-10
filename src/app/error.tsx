"use client";

import { useEffect } from "react";

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-[#f7faf7] px-4">
            <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm">
                <div className="text-5xl">😕</div>

                <h1 className="mt-5 text-2xl font-extrabold text-gray-900">
                    ডেটা লোড করা যায়নি
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                    দুঃখিত! বাজারদরের তথ্য আনতে সমস্যা হয়েছে।
                    অনুগ্রহ করে আবার চেষ্টা করুন।
                </p>

                <button
                    onClick={reset}
                    className="mt-6 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                    আবার চেষ্টা করুন
                </button>
            </div>
        </main>
    );
}
