"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
    signOut,
    updateUser,
    useSession,
} from "@/lib/auth-client";
import {
    UserRound,
    Mail,
    LogOut,
    Pencil,
    LoaderCircle,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import Image from "next/image";

type ProfileUser = {
    id: string;
    name: string;
    email: string;
    image?: string | null;
};

// Profile name update form
const ProfileForm = ({ user }: { user: ProfileUser }) => {
    const [name, setName] = useState(user.name ?? "");
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleUpdateName = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            setErrorMessage("আপনার নাম লিখুন।");
            setMessage("");
            toast.error("আপনার নাম লিখুন।");
            return;
        }

        if (trimmedName === user.name) {
            setErrorMessage("আপনি কোনো পরিবর্তন করেননি।");
            setMessage("");
            toast.error("আপনি কোনো পরিবর্তন করেননি।");
            return;
        }

        setIsUpdating(true);
        setMessage("");
        setErrorMessage("");

        try {
            const { error } = await updateUser({
                name: trimmedName,
            });

            if (error) {
                const errorText =
                    error.message ||
                    "নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।";

                setErrorMessage(errorText);
                toast.error(errorText);
                return;
            }

            setName(trimmedName);
            setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
            toast.success("নাম সফলভাবে আপডেট হয়েছে!");
        } catch (error) {
            const errorText =
                error instanceof Error
                    ? error.message
                    : "নাম আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";

            setErrorMessage(errorText);
            toast.error(errorText);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <section className="mt-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:mt-6 sm:p-6 md:p-7">
            <div className="mb-5 flex min-w-0 items-center gap-3 sm:mb-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700 sm:size-11">
                    <Pencil className="size-5" />
                </div>

                <div className="min-w-0">
                    <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                        প্রোফাইল আপডেট
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                        আপনার নাম পরিবর্তন করুন।
                    </p>
                </div>
            </div>

            <form onSubmit={handleUpdateName}>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    আপনার নাম
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setMessage("");
                        setErrorMessage("");
                    }}
                    placeholder="আপনার নাম লিখুন"
                    autoComplete="name"
                    maxLength={100}
                    required
                    className="w-full min-w-0 rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:px-4"
                />

                {message && (
                    <p
                        role="status"
                        className="mt-3 flex items-start gap-2 text-sm leading-5 text-green-700"
                    >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                        <span>{message}</span>
                    </p>
                )}

                {errorMessage && (
                    <p
                        role="alert"
                        className="mt-3 flex items-start gap-2 text-sm leading-5 text-red-600"
                    >
                        <AlertCircle className="mt-0.5 size-4 shrink-0" />
                        <span>{errorMessage}</span>
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isUpdating || !name.trim()}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-5 sm:w-auto"
                >
                    {isUpdating && (
                        <LoaderCircle className="size-4 animate-spin" />
                    )}
                    {isUpdating ? "পরিবর্তন হচ্ছে..." : "পরিবর্তন করুন"}
                </button>
            </form>
        </section>
    );
};

// Main profile page
const ProfilePage = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [isSigningOut, setIsSigningOut] = useState(false);
    const [signOutError, setSignOutError] = useState("");

    const handleSignOut = async () => {
        setIsSigningOut(true);
        setSignOutError("");

        try {
            const { error } = await signOut();

            if (error) {
                const errorText =
                    error.message || "Sign out করা যায়নি!";

                setSignOutError(errorText);
                toast.error(errorText);
                return;
            }

            toast.success("সফলভাবে Sign out হয়েছে!");
            router.replace("/sign-in");
        } catch (error) {
            const errorText =
                error instanceof Error
                    ? error.message
                    : "Sign out করতে সমস্যা হয়েছে!";

            setSignOutError(errorText);
            toast.error(errorText);
        } finally {
            setIsSigningOut(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center px-4">
                <LoaderCircle
                    className="size-8 animate-spin text-green-600"
                    aria-label="Loading profile"
                />
            </div>
        );
    }

    if (!session) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center px-3 py-12 sm:px-5 sm:py-20">
                <div className="w-full max-w-xl rounded-2xl border border-gray-100 bg-white px-4 py-8 text-center shadow-sm sm:px-6 sm:py-10">
                    <UserRound className="mx-auto mb-4 size-10 text-gray-400 sm:size-12" />

                    <h1 className="text-lg font-bold leading-7 text-gray-800 sm:text-xl">
                        আপনার প্রোফাইল দেখতে সাইন ইন করুন
                    </h1>

                    <button
                        type="button"
                        onClick={() => router.push("/sign-in")}
                        className="mt-5 w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:w-auto"
                    >
                        সাইন ইন
                    </button>
                </div>
            </main>
        );
    }

    const user = session.user;
    const firstLetter =
        user.name?.trim().charAt(0).toUpperCase() || "U";

    return (
        <main className="min-h-screen bg-gray-50 px-3 py-6 sm:px-5 sm:py-8 md:px-6 md:py-10">
            <div className="mx-auto w-full max-w-3xl">
                {/* Page Header */}
                <div className="mb-5 sm:mb-7">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        আপনার প্রোফাইল
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        আপনার ব্যক্তিগত তথ্য দেখুন এবং আপডেট করুন।
                    </p>
                </div>

                {/* Profile Overview */}
                <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 md:p-7">
                    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={`${user.name || "User"} profile`}
                                    width={64}
                                    height={64}
                                    className="size-14 shrink-0 rounded-full border border-gray-100 object-cover sm:size-16"
                                />
                            ) : (
                                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700 sm:size-16 sm:text-2xl">
                                    {firstLetter}
                                </div>
                            )}

                            <div className="min-w-0 flex-1">
                                <h2 className="break-words text-lg font-bold text-gray-900 sm:text-xl">
                                    {user.name || "User"}
                                </h2>

                                <p className="mt-1 flex min-w-0 items-start gap-2 break-all text-xs leading-5 text-gray-500 sm:text-sm">
                                    <Mail className="mt-0.5 size-4 shrink-0" />
                                    <span>{user.email}</span>
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2.5"
                        >
                            {isSigningOut ? (
                                <LoaderCircle className="size-4 animate-spin" />
                            ) : (
                                <LogOut className="size-4" />
                            )}

                            {isSigningOut
                                ? "সাইন আউট হচ্ছে..."
                                : "সাইন আউট"}
                        </button>
                    </div>

                    {signOutError && (
                        <p
                            role="alert"
                            className="mt-4 break-words text-sm leading-5 text-red-600"
                        >
                            {signOutError}
                        </p>
                    )}
                </section>

                {/* Profile Update Form */}
                <ProfileForm
                    key={user.id}
                    user={{
                        id: user.id,
                        name: user.name ?? "",
                        email: user.email,
                        image: user.image,
                    }}
                />
            </div>
        </main>
    );
};

export default ProfilePage;
