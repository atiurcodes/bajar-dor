"use client";
import { signUp } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";

export default function SignUpPage() {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

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
                        {/* <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            আপনার নাম
                        </label> */}

                        <TextField className="w-full rounded-lg border border-gray-300 outline-none transition focus:border-green-600 focus:ring-green-100"
                            isRequired
                            name="name"
                            validate={(value) => {
                                if (value.length < 3) {
                                    return "Name must be at least 3 characters";
                                }
                                return null;
                            }}
                        >
                            <Label className="mb-2 block text-sm font-semibold text-gray-700">আপনার নাম</Label>
                            <Input placeholder="আপনার নাম" />
                            <FieldError />
                        </TextField>

                    </div>

                    <div>
                        {/* <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            ইমেইল
                        </label> */}
                        {/* <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="আপনার ইমেইল লিখুন"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 "
                        /> */}

                        <TextField className="w-full rounded-lg border border-gray-300 outline-none transition focus:border-green-600 focus:ring-green-100"
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
                        {/* <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            পাসওয়ার্ড
                        </label> */}
                        {/* <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="কমপক্ষে ৮ অক্ষর লিখুন"
                            minLength={8}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        /> */}

                        <TextField className="w-full rounded-lg border border-gray-300 outline-none transition focus:border-green-600 focus:ring-green-100"
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
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
                            <Label className="mb-2 block text-sm font-semibold text-gray-700">পাসওয়ার্ড</Label>
                            <Input placeholder="কমপক্ষে ৮ অক্ষর লিখুন" />
                            <FieldError />
                        </TextField>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800"
                    >
                        Sign Up
                    </button>
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
