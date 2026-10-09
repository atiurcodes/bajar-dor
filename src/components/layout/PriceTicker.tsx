import { getProducts } from "@/lib/api";

const PriceTicker = async () => {
    const products = await getProducts();

    return (
        <div className="overflow-hidden border-y border-green-100 bg-[#f0f8f1]">
            <div className="flex w-max animate-marquee">
                {[...products, ...products].map((product, index) => {
                    const isUp = product.change.dir === "up";
                    const isDown = product.change.dir === "down";

                    return (
                        <div
                            key={`${product.id}-${index}`}
                            className="flex shrink-0 items-center gap-2 border-r border-green-200 px-5 py-3 text-sm"
                        >
                            <span className="text-lg">
                                {product.image}
                            </span>

                            <span className="font-semibold text-gray-800">
                                {product.nameBn}
                            </span>

                            <span className="font-bold text-gray-900">
                                {product.today.toLocaleString("bn-BD")} টাকা/
                                {product.unit}
                            </span>

                            <span
                                className={
                                    isUp
                                        ? "font-semibold text-green-600"
                                        : isDown
                                            ? "font-semibold text-red-500"
                                            : "font-semibold text-gray-500"
                                }
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PriceTicker;