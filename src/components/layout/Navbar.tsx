
// import BanglaDate from './BanglaDate';
import CategoryNav from './CategoryNav';
import PriceTicker from './PriceTicker';
import AuthButtons from '../auth/AuthButtons';
import Link from 'next/link';

const Navbar = () => {
    const banglaDate = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    return (
        <section id='' className='py-2 bg-white'>
            <div className='container mx-auto flex justify-between items-center gap-2 px-3 sm:px-4'>
                <Link href='/'>
                    <div className='flex justify-center items-center gap-2 min-w-0'>
                        {/* <Image src={logo} alt='' width={40} height={40} className='bg-green-700 p-2 rounded-xl h-fit' /> */}
                        <div className='bg-green-700 p-2 rounded-xl'>
                            <span className="text-xl shrink-0">🛒</span>
                        </div>
                        <div className='min-w-0'>
                            <h2 className='text-lg sm:text-xl font-semibold whitespace-nowrap'>বাজার দর</h2>
                            {banglaDate}
                        </div>
                    </div>
                </Link>

                <div className='shrink-0'>
                    <AuthButtons />
                </div>
            </div>

            <div className='border border-gray-100'></div>

            {/* load all category */}
            <div className='container mx-auto py-2'>
                <CategoryNav />
            </div>

            <div className='border border-gray-100'></div>

            <PriceTicker />
        </section>
    );
};

export default Navbar;
