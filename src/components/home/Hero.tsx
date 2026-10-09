import Link from "next/link";

const Hero = () => {
    return (
        <section className="bg-[#f0f8f1]">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16 lg:py-20">
                {/* Left Content */}
                <div>
                    <p className="mb-4 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        🥬 প্রতিদিনের বাজারদর
                    </p>

                    <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        আজকের বাজারের
                        <span className="block text-green-600">
                            দাম এক নজরে
                        </span>
                    </h1>

                    <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও
                        মসলাসহ প্রয়োজনীয় পণ্যের আজকের দাম সহজেই
                        দেখে নিন।
                    </p>

                    <Link
                        href="#সব-পণ্য"
                        className="mt-7 inline-flex items-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                        সব পণ্যের দাম দেখুন
                        <span className="ml-2">→</span>
                    </Link>
                </div>

                {/* Right Illustration */}
                <div className="flex justify-center md:justify-end">
                    <div className="flex h-64 w-full max-w-md items-center justify-center rounded-3xl border border-green-100 bg-white shadow-sm sm:h-80">
                        <div className="text-center">
                            <div className="text-8xl sm:text-9xl">
                                🛒
                            </div>

                            <p className="mt-4 text-lg font-bold text-green-700">
                                বাজার দর
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                আজকের দাম, এক নজরে
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;