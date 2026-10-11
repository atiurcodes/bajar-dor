
// import BanglaDate from './BanglaDate';
import CategoryNav from './CategoryNav';
import PriceTicker from './PriceTicker';
import AuthButtons from '../auth/AuthButtons';

const Navbar = () => {
    return (
        <section id='' className='py-2'>
            <div className='container mx-auto flex justify-between items-center gap-2 px-3 sm:px-4'>
                <div className='flex justify-center items-center gap-2 min-w-0'>
                    {/* <Image src={logo} alt='' width={40} height={40} className='bg-green-700 p-2 rounded-xl h-fit' /> */}
                    <span className="text-2xl sm:text-3xl shrink-0">🛒</span>
                    <div className='min-w-0'>
                        <h2 className='text-lg sm:text-xl font-semibold whitespace-nowrap'>বাজার দর</h2>
                        {/* <BanglaDate /> */}
                    </div>
                </div>

                <div className='shrink-0'>
                    <AuthButtons />
                </div>
            </div>

            <div className='border border-gray-200'></div>

            {/* load all category */}
            <div className='container mx-auto py-3 sm:py-4 px-2 sm:px-4'>
                <CategoryNav />
            </div>

            <div className='border border-gray-200'></div>

            <PriceTicker />
        </section>
    );
};

export default Navbar;
