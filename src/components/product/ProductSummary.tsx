import type { Product } from "@/types/product";

interface ProductSummaryProps {
    product: Product;
}

const ProductSummary = ({
    product,
}: ProductSummaryProps) => {
    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";

    const unitText: Record<string, string> = {
        kg: "প্রতি কেজি",
        liter: "প্রতি লিটার",
        dozen: "প্রতি ডজন",
        piece: "প্রতি পিস",
    };

    return (
        <section className="bg-[#f0f8f1] py-10 sm:py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Product Image */}
                    <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-green-100 bg-white shadow-sm">
                        <span className="text-[120px]">
                            {product.image}
                        </span>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
                                {product.categoryIcon}{" "}
                                {product.categoryNameBn}
                            </span>

                            <span className="rounded-full bg-white px-3 py-1.5 text-sm text-gray-600">
                                {unitText[product.unit] ||
                                    `প্রতি ${product.unit}`}
                            </span>
                        </div>

                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            {product.nameBn}
                        </h1>

                        <p className="mt-4 leading-7 text-gray-600">
                            {product.nameBn} এর আজকের বাজারদর
                            এবং সাম্প্রতিক দামের তথ্য এক নজরে
                            দেখুন।
                        </p>

                        {/* Today Price */}
                        <div className="mt-6 rounded-2xl border border-green-100 bg-white p-5">
                            <p className="text-sm text-gray-500">
                                আজকের দাম
                            </p>

                            <div className="mt-2 flex flex-wrap items-end gap-3">
                                <span className="text-4xl font-extrabold text-gray-900">
                                    {product.today.toLocaleString(
                                        "bn-BD"
                                    )}
                                </span>

                                <span className="mb-1 text-gray-500">
                                    টাকা{" "}
                                    {unitText[product.unit] ||
                                        `/ ${product.unit}`}
                                </span>

                                <span
                                    className={
                                        isUp
                                            ? "rounded-full bg-green-100 px-3 py-1.5 text-sm font-bold text-green-700"
                                            : isDown
                                                ? "rounded-full bg-red-100 px-3 py-1.5 text-sm font-bold text-red-600"
                                                : "rounded-full bg-gray-100 px-3 py-1.5 text-sm font-bold text-gray-500"
                                    }
                                >
                                    {isUp && "▲"}
                                    {isDown && "▼"}
                                    {!isUp && !isDown && "—"}{" "}
                                    {product.change.pct.toLocaleString(
                                        "bn-BD",
                                        {
                                            minimumFractionDigits: 1,
                                            maximumFractionDigits: 1,
                                        }
                                    )}
                                    %
                                </span>
                            </div>
                        </div>

                        {/* Previous Prices */}
                        <div className="mt-5 grid grid-cols-3 gap-3">
                            <div className="rounded-xl bg-white p-4 text-center">
                                <p className="text-xs text-gray-500">
                                    গতকাল
                                </p>

                                <p className="mt-1 font-bold text-gray-900">
                                    {product.yesterday.toLocaleString(
                                        "bn-BD"
                                    )}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-4 text-center">
                                <p className="text-xs text-gray-500">
                                    গত সপ্তাহ
                                </p>

                                <p className="mt-1 font-bold text-gray-900">
                                    {product.lastWeek.toLocaleString(
                                        "bn-BD"
                                    )}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-4 text-center">
                                <p className="text-xs text-gray-500">
                                    গত মাস
                                </p>

                                <p className="mt-1 font-bold text-gray-900">
                                    {product.lastMonth.toLocaleString(
                                        "bn-BD"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSummary;