"use client";
import { InputGroup, FieldError, Input, Label, TextField } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
    const [isVisible, setIsVisible] = useState(false);
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as Record<string, string>;
        try {
            const { error } = await signIn.email({
                email: data.email,
                password: data.password,
                callbackURL: '/'
            })
            if (error) {
                toast.error(error.message || "Login failed!");
                return;
            }

            toast.success("Login successful!");
        }
        catch {
            toast.error("Something went wrong!");
        }

    };

    return (
        <main className="flex min-h-[75vh] items-center justify-center bg-[#f7faf7] px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-lg sm:p-8">
                <div className="mb-7 text-center">
                    <div className="mb-3 text-4xl">🛒</div>
                    <h1 className="text-3xl font-bold text-green-800">
                        আবার স্বাগতম!
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        বাজার দর অ্যাকাউন্টে লগইন করুন
                    </p>
                </div>

                <form onSubmit={handleOnSubmit} className="space-y-5">
                    <div>
                        {/* className="w-full rounded-lg border border-gray-300 outline-none transition focus:border-green-600 focus:ring-green-100" */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label className="mb-2 block text-sm font-semibold text-gray-700">ইমেইল</Label>
                            <Input placeholder="আপনার ইমেইল লিখুন" />
                            <FieldError />
                        </TextField>
                    </div>

                    <div>
                        <TextField
                            isRequired
                            name="password"
                            type={isVisible ? "text" : "password"}
                            validate={(value) => {
                                if (!value) {
                                    return "Please enter your password";
                                }

                                return null;
                            }}
                        >
                            <Label>পাসওয়ার্ড</Label>
                            {/* <Input placeholder="কমপক্ষে ৮ অক্ষর লিখুন" /> */}
                            <InputGroup fullWidth>
                                <InputGroup.Input placeholder="কমপক্ষে ৮ অক্ষর লিখুন" type={isVisible ? 'text' : 'password'} />
                                <InputGroup.Suffix>
                                    <button className="cursor-pointer"
                                        type="button"
                                        onClick={() => setIsVisible(!isVisible)}
                                    >
                                        {
                                            isVisible ? <Eye className="size-4 text-muted" /> : <EyeSlash className="size-4 text-muted" />

                                        }
                                    </button>
                                </InputGroup.Suffix>
                            </InputGroup>
                            <FieldError />
                        </TextField>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/sign-up"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        Sign Up করুন
                    </Link>
                </p>

                <Link
                    href="/"
                    className="mt-5 block text-center text-sm text-gray-500 hover:text-green-700"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
}