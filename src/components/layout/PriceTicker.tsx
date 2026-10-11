import Link from "next/link";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

const PriceTicker = async () => {
    let products: Product[] = [];

    try {
        products = await getProducts();
    } catch (error) {
        console.error("Price ticker failed to load:", error);

        return (
            <div className="border-y border-green-100 bg-[#f0f8f1] px-3 py-2.5 text-center text-xs text-gray-600 sm:px-4 sm:py-3 sm:text-sm">
                আপাতত বাজারদরের তথ্য পাওয়া যাচ্ছে না।
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div
            className="w-full overflow-hidden border-y border-green-100 bg-[#f0f8f1]"
            aria-label="আজকের বাজারদরের চলমান তালিকা"
        >

            <div className="flex w-max animate-marquee focus-within:paused motion-reduce:animate-none">
                {[...products, ...products].map((product, index) => {
                    const isUp = product.change.dir === "up";
                    const isDown = product.change.dir === "down";

                    return (
                        <Link
                            key={`${product.id}-${index}`}
                            href={`/product/${product.slug}`}
                            aria-label={`${product.nameBn}, আজকের দাম ${product.today.toLocaleString("bn-BD")} টাকা প্রতি ${product.unit}`}
                            className="flex shrink-0 items-center gap-1.5 border-r border-green-200 px-3 py-2.5 text-xs transition-colors hover:bg-green-100 focus-visible:bg-green-100 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-green-600 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
                        >
                            <span
                                className="text-base sm:text-lg"
                                aria-hidden="true"
                            >
                                {product.image}
                            </span>

                            <span className="whitespace-nowrap font-semibold text-gray-800">
                                {product.nameBn}
                            </span>

                            <span className="whitespace-nowrap font-bold text-gray-900">
                                {product.today.toLocaleString("bn-BD")} টাকা/
                                {product.unit}
                            </span>

                            <span
                                className={`whitespace-nowrap font-semibold ${isUp
                                    ? "text-green-600"
                                    : isDown
                                        ? "text-red-500"
                                        : "text-gray-500"
                                    }`}
                            >
                                {isUp && "▲"}
                                {isDown && "▼"}
                                {!isUp && !isDown && "—"}{" "}
                                {product.change.pct.toLocaleString("bn-BD", {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1,
                                })}
                                %
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default PriceTicker;
