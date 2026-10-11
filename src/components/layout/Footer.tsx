
const Footer = () => {
    return (
        <footer className="border-t border-green-100 bg-white">
            <div className="container mx-auto p-4 md:py-4 w-full flex flex-col text-center md:text-start md:flex-row 
                md:items-center md:justify-between">
                {/* Brand */}
                <div className="">
                    <p className="text-lg font-bold text-green-700 sm:text-xl">
                        বাজার দর
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                </div>

                {/* Disclaimer */}
                <p className="text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6 md:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে
                    পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;
