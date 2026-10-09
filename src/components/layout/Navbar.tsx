import Link from "next/link";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";

const Navbar = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header className="border-b border-green-100 bg-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex min-h-[82px] items-center justify-between gap-6">
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl">🛒</span>

                            <div>
                                <h1 className="text-2xl font-extrabold text-green-700">
                                    বাজার দর
                                </h1>

                                <p className="mt-0.5 text-xs text-gray-500">
                                    {date}
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/signin"
                            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                        >
                            সাইন ইন
                        </Link>

                        <Link
                            href="/signup"
                            className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            সাইন আপ
                        </Link>
                    </div>
                </div>
            </div>

            <CategoryNav />

            <PriceTicker />
        </header>
    );
};

export default Navbar;