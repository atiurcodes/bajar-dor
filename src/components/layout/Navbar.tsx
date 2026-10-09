
import Link from "next/link";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import AuthButtons from "../auth/AuthButtons";

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

                    {/* Authentication UI */}
                    <AuthButtons />
                </div>
            </div>

            <CategoryNav />
            <PriceTicker />
        </header>
    );
};

export default Navbar;
