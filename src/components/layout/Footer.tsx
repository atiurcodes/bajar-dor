
const Footer = () => {
    return (
        <footer className="border-t border-green-100 bg-white">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-3 py-6 sm:gap-5 sm:px-5 sm:py-8 md:flex-row 
                md:items-center md:justify-between md:gap-8 lg:px-6">
                {/* Brand */}
                <div className="min-w-0">
                    <p className="text-lg font-bold text-green-700 sm:text-xl">
                        বাজার দর
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                </div>

                {/* Disclaimer */}
                <p className="max-w-md text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6 md:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে
                    পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;
