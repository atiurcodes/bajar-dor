import Link from "next/link";
import Image from 'next/image';
// import BanglaDate from './BanglaDate';
import bannerImg from '@/assets/bazar-hero.png'

const Hero = () => {
    return (
        <section className='container mx-auto px-4 bg-white rounded-2xl'>
            <div className='flex justify-between my-6 p-6'>
                <div className="space-y-6">
                    {/* <BanglaDate /> */}
                    <h2 className='text-black text-5xl'>আজকের বাজারের দাম এক নজরে</h2>
                    <p className="max-w-xl">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
                        সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>
                    <Link
                        href="#সব-পণ্য"
                        className="mt-7 inline-flex items-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                        সব পণ্যের দাম দেখুন
                        <span className="ml-2">→</span>
                    </Link>
                </div>
                <div className='flex justify-end flex-1'>
                    <Image src={bannerImg} alt='banner img' />
                </div>
            </div>
        </section>
    );
};

export default Hero;