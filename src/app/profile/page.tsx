"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

type ProfileUser = {
    id: string;
    name: string;
    email: string;
    image?: string | null;
};

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
            return;
        }

        if (trimmedName === user.name) {
            setErrorMessage("আপনি কোনো পরিবর্তন করেননি।");
            setMessage("");
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
                setErrorMessage(
                    error.message || "নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।"
                );
                return;
            }

            setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
        } catch {
            setErrorMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-green-50 p-2.5 text-green-700">
                    <Pencil className="h-5 w-5" />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-gray-900">
                        প্রোফাইল আপডেট
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
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
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                {message && (
                    <p
                        role="status"
                        className="mt-3 flex items-center gap-2 text-sm text-green-700"
                    >
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        {message}
                    </p>
                )}

                {errorMessage && (
                    <p
                        role="alert"
                        className="mt-3 flex items-center gap-2 text-sm text-red-600"
                    >
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errorMessage}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isUpdating || !name.trim()}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isUpdating && (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                    )}
                    {isUpdating ? "আপডেট হচ্ছে..." : "Update Name"}
                </button>
            </form>
        </section>
    );
};

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
                setSignOutError(error.message || "Sign out করা যায়নি।");
                setIsSigningOut(false);
                return;
            }

            router.replace("/signin");
            router.refresh();
        } catch {
            setSignOutError("Sign out করা যায়নি। আবার চেষ্টা করুন।");
            setIsSigningOut(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-80 items-center justify-center">
                <LoaderCircle className="h-8 w-8 animate-spin text-green-600" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="mx-auto max-w-xl px-4 py-20 text-center">
                <UserRound className="mx-auto mb-4 h-12 w-12 text-gray-400" />

                <h1 className="text-xl font-bold text-gray-800">
                    আপনার প্রোফাইল দেখতে সাইন ইন করুন
                </h1>

                <button
                    type="button"
                    onClick={() => router.push("/signin")}
                    className="mt-5 rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
                >
                    সাইন ইন
                </button>
            </div>
        );
    }

    const user = session.user;
    const firstLetter = user.name?.trim().charAt(0).toUpperCase() || "U";

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-3xl">
                <div className="mb-7">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        আপনার প্রোফাইল
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        আপনার ব্যক্তিগত তথ্য দেখুন এবং আপডেট করুন।
                    </p>
                </div>

                {/* Profile Overview */}
                <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-4">
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={`${user.name} profile`}
                                    className="h-16 w-16 shrink-0 rounded-full border border-gray-100 object-cover"
                                />
                            ) : (
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
                                    {firstLetter}
                                </div>
                            )}

                            <div className="min-w-0">
                                <h2 className="truncate text-xl font-bold text-gray-900">
                                    {user.name}
                                </h2>
                                <p className="mt-1 flex items-center gap-2 break-all text-sm text-gray-500">
                                    <Mail className="h-4 w-4 shrink-0" />
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSigningOut ? (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                            ) : (
                                <LogOut className="h-4 w-4" />
                            )}
                            {isSigningOut ? "সাইন আউট হচ্ছে..." : "Sign Out"}
                        </button>
                    </div>

                    {signOutError && (
                        <p role="alert" className="mt-4 text-sm text-red-600">
                            {signOutError}
                        </p>
                    )}
                </section>

                {/* Separate form component, initialized from loaded session */}
                <ProfileForm key={user.id} user={user} />
            </div>
        </main>
    );
};

export default ProfilePage;
