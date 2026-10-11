
import Link from "next/link";
import Image from "next/image";
// import BanglaDate from "./BanglaDate";
import bannerImg from "@/assets/bazar-hero.png";

const Hero = () => {
    return (
        <section className="container mx-auto rounded-2xl bg-white px-3 sm:px-4">
            <div className="my-2 flex flex-col justify-between gap-3 p-2 sm:my-4 sm:gap-5 sm:p-4 md:my-6 md:flex-row md:items-center 
                md:gap-8 md:p-6">
                <div className="space-y-2 sm:space-y-4 md:flex-1 md:space-y-6">
                    {/* <BanglaDate /> */}

                    <h2 className="text-2xl font-semibold leading-snug text-black sm:text-4xl md:text-5xl">
                        আজকের বাজারের দাম এক নজরে
                    </h2>

                    <p className="max-w-xl text-sm leading-6 sm:text-base sm:leading-7">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
                        সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <Link
                        href="#সব-পণ্য"
                        className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 sm:mt-2 sm:px-6 sm:py-3 sm:text-base md:mt-7"
                    >
                        সব পণ্যের দাম দেখুন
                        <span className="ml-2">→</span>
                    </Link>
                </div>
                <div className="flex min-w-0 flex-1 justify-center md:justify-end">
                    <Image
                        src={bannerImg}
                        alt="আজকের বাজারের পণ্যের ব্যানার"
                        priority
                        sizes="(max-width: 639px) 220px, (max-width: 767px) 320px, (max-width: 1023px) 360px, 420px"
                        className="h-auto w-full max-w-[200px] object-contain sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px] xl:max-w-[400px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
