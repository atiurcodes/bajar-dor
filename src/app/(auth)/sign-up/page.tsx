"use client";
import { signIn, signUp } from "@/lib/auth-client";
import { InputGroup, FieldError, Input, Label, TextField, Button } from "@heroui/react";
import { Eye, EyeSlash, LogoGithub } from "@gravity-ui/icons";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
    const [isVisible, setIsVisible] = useState(false);
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as Record<string, string>;
        const { data: resData, error } = await signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: '/'
        })
        console.log(resData, error);
    };

    const handleGoogleSignUp = async () => {
        const resData = await signIn.social({
            provider: 'google'
        })
        console.log(resData);
    };

    const handleGithubSignUp = async () => {
        const resData = await signIn.social({
            provider: 'github'
        })
        console.log(resData);
    };

    return (
        <main className="flex min-h-[75vh] items-center justify-center bg-[#f7faf7] px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-lg sm:p-8">
                <div className="mb-7 text-center">
                    <div className="mb-3 text-4xl">🛒</div>
                    <h1 className="text-3xl font-bold text-green-800">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        বাজার দর-এর সঙ্গে যুক্ত হোন
                    </p>
                </div>

                <form onSubmit={handleOnSubmit} className="space-y-5">
                    <div>
                        <TextField
                            isRequired
                            name="name"
                            type="text">
                            <Label className="mb-2 block text-sm font-semibold text-gray-700">নাম</Label>
                            <Input placeholder="আপনার ইমেইল লিখুন" />
                            <FieldError />
                        </TextField>

                    </div>

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
                            minLength={8}
                            name="password"
                            type={isVisible ? 'text' : 'password'}
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
                        Sign Up
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-300" />
                        <span className="text-xs font-medium text-gray-500">OR</span>
                        <div className="h-px flex-1 bg-gray-300" />
                    </div>
                    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button onClick={handleGoogleSignUp}
                            type="button"
                            className="flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-800 shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md"
                        >
                            <span className="text-xl font-bold text-[#4285F4]">G</span>
                            <span>Google</span>
                        </Button>

                        <Button onClick={handleGithubSignUp}
                            type="button"
                            className="flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-700 bg-[#18181b] px-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:border-gray-500 hover:bg-black hover:shadow-md"
                        >
                            <LogoGithub />
                            <span>GitHub</span>
                        </Button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    আগে থেকেই অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        Sign In করুন
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
