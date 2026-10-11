"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
    InputGroup,
    FieldError,
    Input,
    Label,
    TextField,
    Button,
} from "@heroui/react";
import { Eye, EyeSlash, LogoGithub } from "@gravity-ui/icons";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const handleOnSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            formData.entries()
        ) as Record<string, string>;

        try {
            const { error } = await signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Sign up failed!");
                return;
            }
            toast.success("Account created successfully!");
            router.push("/");
            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleGoogleSignUp = async () => {
        sessionStorage.setItem("social-auth-pending", "google");

        try {
            const { error } = await signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                sessionStorage.removeItem("social-auth-pending");
                toast.error(error.message || "Google sign up failed!");
            }
        } catch {
            sessionStorage.removeItem("social-auth-pending");
            toast.error("Google sign up failed!");
        }
    };

    const handleGithubSignUp = async () => {
        sessionStorage.setItem("social-auth-pending", "github");

        try {
            const { error } = await signIn.social({
                provider: "github",
                callbackURL: "/",
            });

            if (error) {
                sessionStorage.removeItem("social-auth-pending");
                toast.error(error.message || "GitHub sign up failed!");
            }
        } catch {
            sessionStorage.removeItem("social-auth-pending");
            toast.error("GitHub sign up failed!");
        }
    };

    return (
        <main className="flex min-h-[75vh] items-center justify-center bg-[#f7faf7] px-3 py-8 sm:px-5 sm:py-12">
            <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-4 shadow-lg sm:p-7 md:p-8">
                {/* Header */}
                <div className="mb-6 text-center sm:mb-7">
                    <div
                        className="mb-3 text-3xl sm:text-4xl"
                        aria-hidden="true"
                    >
                        🛒
                    </div>

                    <h1 className="text-2xl font-bold leading-tight text-green-800 sm:text-3xl">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        বাজার দর-এর সঙ্গে যুক্ত হোন
                    </p>
                </div>

                {/* Sign Up Form */}
                <form
                    onSubmit={handleOnSubmit}
                    className="space-y-4 sm:space-y-5"
                >
                    {/* Name */}
                    <TextField isRequired name="name" type="text">
                        <Label className="mb-2 block text-sm font-semibold text-gray-700">
                            নাম
                        </Label>

                        <Input
                            placeholder="আপনার নাম লিখুন"
                            className="w-full"
                        />

                        <FieldError />
                    </TextField>

                    {/* Email */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    value
                                )
                            ) {
                                return "Please enter a valid email address";
                            }

                            return null;
                        }}
                    >
                        <Label className="mb-2 block text-sm font-semibold text-gray-700">
                            ইমেইল
                        </Label>

                        <Input
                            placeholder="আপনার ইমেইল লিখুন"
                            className="w-full"
                        />

                        <FieldError />
                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type={isVisible ? "text" : "password"}
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }

                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }

                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }

                            return null;
                        }}
                    >
                        <Label className="mb-2 block text-sm font-semibold text-gray-700">
                            পাসওয়ার্ড
                        </Label>

                        <InputGroup fullWidth>
                            <InputGroup.Input
                                placeholder="কমপক্ষে ৮ অক্ষর লিখুন"
                                type={isVisible ? "text" : "password"}
                            />

                            <InputGroup.Suffix>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsVisible((prev) => !prev)
                                    }
                                    aria-label={
                                        isVisible
                                            ? "পাসওয়ার্ড লুকান"
                                            : "পাসওয়ার্ড দেখুন"
                                    }
                                    aria-pressed={isVisible}
                                    className="flex shrink-0 items-center justify-center rounded-md p-1.5 text-gray-500 transition hover:text-green-700 focus-visible:outline-2 focus-visible:outline-green-600"
                                >
                                    {isVisible ? (
                                        <Eye className="size-4" />
                                    ) : (
                                        <EyeSlash className="size-4" />
                                    )}
                                </button>
                            </InputGroup.Suffix>
                        </InputGroup>

                        <FieldError />
                    </TextField>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:text-base"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 py-1">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-xs font-medium text-gray-500">
                            অথবা
                        </span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Social Sign Up */}
                    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="h-12 w-full min-w-0 rounded-lg border border-gray-300 bg-white text-black shadow-sm transition 
                                hover:shadow-md hover:border-green-300"
                        >
                            <span className="flex w-full min-w-0 items-center justify-center gap-2">
                                <span
                                    className="shrink-0 text-xl font-bold text-red-500"
                                    aria-hidden="true"
                                >
                                    G
                                </span>
                                <span className="text-sm font-semibold">
                                    Google দিয়ে চালিয়ে যান
                                </span>
                            </span>
                        </Button>

                        <Button
                            type="button"
                            onClick={handleGithubSignUp}
                            className="h-12 w-full min-w-0 rounded-lg border border-gray-300 bg-white text-black shadow-sm transition
                            hover:shadow-md hover:border-green-300"
                        >
                            <span className="flex w-full min-w-0 items-center justify-center gap-2 px-4">
                                <LogoGithub />
                                <span className="text-center text-sm font-semibold">
                                    GitHub দিয়ে চালিয়ে যান
                                </span>
                            </span>
                        </Button>
                    </div>
                </form>

                {/* Sign In Link */}
                <div className="flex items-center justify-center gap-1 mt-5 text-center text-sm leading-6 sm:mt-6">
                    <p className="text-gray-600">অ্যাকাউন্ট নেই?</p>
                    <button className="font-semibold text-green-700 hover:underline focus-visible:outline-2 focus-visible:outline-green-600">
                        <Link href="/sign-in">
                            Sign In করুন
                        </Link>
                    </button>
                </div>

                {/* Home Link */}
                <Link
                    href="/"
                    className="mt-4 block rounded-md py-1 text-center text-sm text-gray-500 transition hover:text-green-700 focus-visible:outline-2 focus-visible:outline-green-600 sm:mt-5"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
}
