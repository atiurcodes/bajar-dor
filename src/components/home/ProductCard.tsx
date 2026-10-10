import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";

    const unitText: Record<string, string> = {
        kg: "প্রতি কেজি",
        liter: "প্রতি লিটার",
        dozen: "প্রতি ডজন",
        piece: "প্রতি পিস",
    };

    return (
        <Link
            href={`/product/${product.slug}`}
            className="group block rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
            {/* Product Info */}
            <div className="">
                <div className="flex justify-between gap-3">
                    <div className="flex item-center gap-2">
                        <div className="p-4 rounded-2xl bg-gray-100">
                            <span className="text-3xl">
                                {product.image}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">
                                {product.nameBn}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                {unitText[product.unit] || `প্রতি ${product.unit}`}
                            </p>
                        </div>

                    </div>
                    <div>
                        <span className="shrink-0 rounded-2xl bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                            {product.categoryIcon} {product.categoryNameBn}
                        </span>
                    </div>
                </div>

                {/* Price */}
                <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-xs text-gray-500">
                            আজকের দাম
                        </p>

                        <p className="mt-1 text-xl font-extrabold text-gray-900">
                            {product.today.toLocaleString("bn-BD")} টাকা
                        </p>
                    </div>

                    <span
                        className={isUp ? "rounded-full bg-gray-100 px-3 py-1.5 text-sm font-bold text-red-500"
                            : isDown ? "rounded-full bg-gray-100 px-3 py-1.5 text-sm font-bold text-green-500"
                                : "rounded-full bg-gray-100 px-3 py-1.5 text-sm font-bold text-gray-500"
                        }>
                        {isUp && "▲"}
                        {isDown && "▼"}
                        {!isUp && !isDown && "—"}{" "}
                        {product.change.pct.toLocaleString("bn-BD", {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                        })}
                        %
                    </span>
                </div>
            </div>
        </Link >
    );
};

export default ProductCard;