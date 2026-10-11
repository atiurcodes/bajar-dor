import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type RisingPricesProps = {
    products: Product[];
};

const RisingPrices = ({ products }: RisingPricesProps) => {
    const risingProducts = products
        .filter((product) => product.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    return (
        <section className="container mx-auto px-4">
            <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2">
                    <span
                        aria-hidden="true"
                        className="text-2xl text-green-500"
                    >
                        ▲
                    </span>

                    <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        আজ দাম বেড়েছে
                    </h2>
                </div>

                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    আজ যেসব পণ্যের দাম তুলনামূলকভাবে বেড়েছে।
                </p>
            </div>

            {risingProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
                    {risingProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <p className="rounded-xl bg-white p-6 text-center text-gray-500">
                    আজ কোনো পণ্যের দাম বাড়েনি।
                </p>
            )}
        </section>
    );
};

export default RisingPrices;
