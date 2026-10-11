
import type { Product } from "@/types/product";

interface MarketPriceTableProps {
    product: Product;
}

const MarketPriceTable = ({ product }: MarketPriceTableProps) => {
    const formatPrice = (price: number) =>
        price.toLocaleString("bn-BD", {
            maximumFractionDigits: 2,
        });

    const unitText: Record<string, string> = {
        kg: "কেজি",
        liter: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
    };

    const unit = unitText[product.unit] || product.unit;
    const priceDifference = product.today - product.yesterday;

    const isUp = priceDifference > 0;
    const isDown = priceDifference < 0;

    const markets = product.markets ?? [];

    const minPrice =
        markets.length > 0
            ? Math.min(...markets.map((market) => market.min))
            : null;

    const maxPrice =
        markets.length > 0
            ? Math.max(...markets.map((market) => market.max))
            : null;

    // প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের মধ্যবিন্দুর গড়
    const averagePrice =
        markets.length > 0
            ? markets.reduce(
                (total, market) =>
                    total + (market.min + market.max) / 2,
                0,
            ) / markets.length
            : null;

    return (
        <section className="container mx-auto space-y-7 px-3 py-4 sm:space-y-9 sm:px-4 sm:py-6 md:space-y-10 md:py-8">
            {/* Selected Product Overview */}
            <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-gray-200/60 bg-[#f8f9f8] p-3 shadow-sm sm:gap-5 sm:p-5 md:flex-row md:items-center md:justify-between md:p-6">
                {/* Product Image & Details */}
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#eff2ee] sm:size-16 md:size-20">
                        <span className="text-3xl sm:text-4xl md:text-5xl">
                            {product.image}
                        </span>
                    </div>

                    <div className="min-w-0 space-y-1">
                        <h1 className="break-words text-lg leading-tight font-bold text-gray-900 sm:text-xl md:text-2xl">
                            {product.nameBn}
                        </h1>

                        <p className="break-words text-xs font-medium text-gray-500 sm:text-sm">
                            প্রতি {unit} · {product.categoryNameBn}
                        </p>

                        <p
                            className={`text-xs leading-5 sm:text-sm ${isUp
                                ? "text-red-600"
                                : isDown
                                    ? "text-green-700"
                                    : "text-gray-600"
                                }`}
                        >
                            {isUp
                                ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${formatPrice(Math.abs(priceDifference))} টাকা`
                                : isDown
                                    ? `গতকালের তুলনায় আজ দাম কমেছে · ${formatPrice(Math.abs(priceDifference))} টাকা`
                                    : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
                        </p>
                    </div>
                </div>

                {/* Today's Price */}
                <div className="flex w-full flex-col items-center justify-center rounded-xl bg-[#eff2ee] p-3 text-center sm:p-4 md:w-auto md:min-w-[120px] md:self-auto md:px-5 md:py-4">
                    <span className="mb-1 text-xs font-medium text-gray-500">
                        আজকের দাম
                    </span>

                    <span className="break-words text-2xl leading-tight font-extrabold text-gray-900 sm:text-3xl">
                        {formatPrice(product.today)}
                    </span>

                    <span className="mt-2 text-xs font-medium text-gray-500">
                        টাকা / {unit}
                    </span>

                    <div
                        className={`mt-1 flex items-center gap-1 text-xs font-bold ${isUp
                            ? "text-red-600"
                            : isDown
                                ? "text-green-700"
                                : "text-gray-500"
                            }`}
                    >
                        {isUp ? (
                            <>
                                <span>▲</span>
                                <span>
                                    {formatPrice(product.change.pct)}%
                                </span>
                            </>
                        ) : isDown ? (
                            <>
                                <span>▼</span>
                                <span>
                                    {formatPrice(product.change.pct)}%
                                </span>
                            </>
                        ) : (
                            <span>০%</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Market Price Summary Cards */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    দামের সারসংক্ষেপ
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    {[
                        {
                            title: "সর্বনিম্ন দাম",
                            price: minPrice,
                            color: "text-green-700",
                        },
                        {
                            title: "সর্বোচ্চ দাম",
                            price: maxPrice,
                            color: "text-red-600",
                        },
                        {
                            title: "গড় দাম",
                            price: averagePrice,
                            color: "text-green-700",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6"
                        >
                            <p className="text-sm font-medium text-gray-600">
                                {item.title}
                            </p>

                            <p
                                className={`mt-2 break-words text-2xl font-extrabold sm:mt-3 sm:text-3xl ${item.color}`}
                            >
                                {item.price !== null &&
                                    Number.isFinite(item.price)
                                    ? `৳${formatPrice(item.price)}`
                                    : "—"}
                            </p>

                            <p className="mt-2 text-xs text-gray-500">
                                প্রতি {unit}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Market-wise Price Table */}
            <div className="min-w-0">
                <div className="mb-4 sm:mb-5">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        বাজারভিত্তিক দামের তালিকা
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        {product.nameBn} — প্রতি {unit}
                    </p>
                </div>

                <div className="max-w-full overflow-x-auto rounded-xl border border-gray-300 bg-white">
                    <table className="w-full min-w-[620px] border-collapse text-left text-xs sm:min-w-[700px] sm:text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="whitespace-nowrap border border-gray-300 px-3 py-3 sm:px-4">
                                    বাজারের নাম
                                </th>
                                <th className="whitespace-nowrap border border-gray-300 px-3 py-3 sm:px-4">
                                    বিভাগ
                                </th>
                                <th className="whitespace-nowrap border border-gray-300 px-3 py-3 text-right sm:px-4">
                                    সর্বনিম্ন দাম
                                </th>
                                <th className="whitespace-nowrap border border-gray-300 px-3 py-3 text-right sm:px-4">
                                    সর্বোচ্চ দাম
                                </th>
                                <th className="whitespace-nowrap border border-gray-300 px-3 py-3 text-right sm:px-4">
                                    গড় দাম
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {markets.length > 0 ? (
                                markets.map((market, index) => {
                                    const average =
                                        (market.min + market.max) / 2;

                                    return (
                                        <tr
                                            key={`${market.market}-${index}`}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="border border-gray-300 px-3 py-3 sm:px-4">
                                                {market.market}
                                            </td>

                                            <td className="border border-gray-300 px-3 py-3 sm:px-4">
                                                {market.division}
                                            </td>

                                            <td className="whitespace-nowrap border border-gray-300 px-3 py-3 text-right sm:px-4">
                                                ৳{formatPrice(market.min)}
                                            </td>

                                            <td className="whitespace-nowrap border border-gray-300 px-3 py-3 text-right sm:px-4">
                                                ৳{formatPrice(market.max)}
                                            </td>

                                            <td className="whitespace-nowrap border border-gray-300 px-3 py-3 text-right font-semibold sm:px-4">
                                                ৳{formatPrice(average)}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="border border-gray-300 px-3 py-8 text-center text-gray-500 sm:px-4"
                                    >
                                        বাজারের দামের তথ্য পাওয়া যায়নি।
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default MarketPriceTable;
