import Link from "next/link";
import type { Product } from "@/types/product";
import { ShoppingBasket } from "@gravity-ui/icons";

interface ProductCardProps {
    product: Product;
}

const unitText: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
};

const ProductCard = ({ product }: ProductCardProps) => {
    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";

    const changeClass = isUp
        ? "bg-green-50 text-green-600"
        : isDown
            ? "bg-red-50 text-red-600"
            : "bg-gray-100 text-gray-600";

    const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

    return (
        <Link
            href={`/product/${product.slug}`}
            className="group block min-w-0 rounded-2xl border border-green-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5"
        >
            {/* Product information */}
            <div className="flex min-w-0 items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 sm:size-14 sm:rounded-2xl">
                        {product.image ? (
                            <span
                                className="text-2xl sm:text-3xl"
                                aria-hidden="true"
                            >
                                {product.image}
                            </span>
                        ) : (
                            <span className="text-2xl sm:text-3xl" aria-hidden="true">
                                🛍️
                            </span>
                        )}
                    </div>

                    <div className="min-w-0">
                        <h3 className="break-words text-base font-bold text-gray-900 sm:text-lg">
                            {product.nameBn}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            {unitText[product.unit] ?? `প্রতি ${product.unit}`}
                        </p>
                    </div>
                </div>

                <span className="max-w-[45%] shrink-0 break-words rounded-xl bg-green-50 px-2 py-1 text-[10px] font-medium text-green-700 sm:max-w-[48%] sm:px-2.5 sm:text-xs">
                    {product.categoryIcon} {product.categoryNameBn}
                </span>
            </div>

            {/* Price and price change */}
            <div className="mt-5 flex min-w-0 flex-wrap items-end justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs text-gray-500">
                        আজকের দাম
                    </p>

                    <p className="mt-1 break-words text-lg font-extrabold text-gray-900 sm:text-xl">
                        {product.today.toLocaleString("bn-BD")} টাকা
                    </p>
                </div>

                <span
                    className={`shrink-0 rounded-full px-2.5 py-1.5 text-xs font-bold sm:text-sm ${changeClass}`}
                    aria-label={`দামের পরিবর্তন ${product.change.pct}%`}
                >
                    {changeIcon}{" "}
                    {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                    })}
                    %
                </span>
            </div>
        </Link>
    );
};

export default ProductCard;
