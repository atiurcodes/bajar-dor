import Image from 'next/image';
import logo from '@/assets/logo-icon.png'
// import BanglaDate from './BanglaDate';
import CategoryNav from './CategoryNav';
import PriceTicker from './PriceTicker';
import AuthButtons from '../auth/AuthButtons';

const Navbar = () => {
    return (
        < section id='' className='py-2' >
            <div className='container mx-auto flex justify-between items-center'>
                <div className='flex justify-center gap-2'>
                    {/* <Image src={logo} alt='' width={40} height={40} className='bg-green-700 p-2 rounded-xl h-fit' /> */}
                    <span className="text-3xl">🛒</span>
                    <div>
                        <h2>বাজার দর</h2>
                        {/* <BanglaDate /> */}
                    </div>
                </div>
                <div className=''>
                    <AuthButtons />
                </div>
            </div>
            <div className='border border-gray-200'></div>
            {/* load all category */}
            <div className='container mx-auto py-4'>
                <CategoryNav />
            </div>
            <div className='border border-gray-200'></div>
            <PriceTicker />
        </section >
    );
};

export default Navbar;