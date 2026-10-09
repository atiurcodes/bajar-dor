import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f3f7f3] px-4">
            <div className="text-center">
                <div className="mb-4 text-7xl">🛒</div>

                <h1 className="mb-3 text-4xl font-bold text-zinc-900">
                    পেজটি পাওয়া যায়নি
                </h1>

                <p className="mb-6 text-zinc-600">
                    আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
                </p>

                <Link
                    href="/"
                    className="inline-flex rounded-lg bg-[#07883f] px-6 py-3 font-semibold text-white transition hover:bg-[#066f34]"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
}