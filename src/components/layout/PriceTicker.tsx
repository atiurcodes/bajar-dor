
import Link from "next/link";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

const PriceTicker = async () => {
    let products: Product[] = [];

    try {
        products = await getProducts();
    } catch (error) {

        return (
            <div className="flex min-h-12 items-center justify-center border-y border-green-100 bg-[#f0f8f1] px-3 py-2.5 text-center text-xs text-gray-600 sm:px-4 sm:text-sm">
                আপাতত বাজারদরের তথ্য পাওয়া যাচ্ছে না।
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div
            className="flex h-12 w-full items-center overflow-hidden border-gray-100"
            aria-label="আজকের বাজারদরের চলমান তালিকা"
        >
            <div className="flex h-full w-max shrink-0 animate-marquee items-center focus-within:paused motion-reduce:animate-none">
                {[...products, ...products].map((product, index) => {
                    const isUp = product.change.dir === "up";
                    const isDown = product.change.dir === "down";

                    return (
                        <Link
                            key={`${product.id}-${index}`}
                            href={`/product/${product.slug}`}
                            aria-label={`${product.nameBn}, আজকের দাম ${product.today.toLocaleString("bn-BD")} টাকা প্রতি ${product.unit}`}
                            className="flex h-full shrink-0 items-center"
                        >
                            <div className="flex items-center gap-3 whitespace-nowrap px-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="text-base sm:text-lg"
                                        aria-hidden="true"
                                    >
                                        {product.image}
                                    </span>

                                    <strong className="font-semibold text-gray-800">
                                        {product.nameBn}
                                    </strong>
                                </div>

                                <div className="flex items-center gap-2">
                                    <strong className="font-bold text-gray-900">
                                        {product.today.toLocaleString("bn-BD")} টাকা/
                                        {product.unit}
                                    </strong>

                                    <strong
                                        className={`font-semibold ${isUp
                                            ? "text-green-600"
                                            : isDown
                                                ? "text-red-500"
                                                : "text-gray-500"
                                            }`}
                                    >
                                        {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                                        {product.change.pct.toLocaleString(
                                            "bn-BD",
                                            {
                                                minimumFractionDigits: 1,
                                                maximumFractionDigits: 1,
                                            }
                                        )}
                                        %
                                    </strong>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default PriceTicker;
