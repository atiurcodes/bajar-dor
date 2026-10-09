import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";

const PriceSection = async () => {
    const products = await getProducts();

    const risingProducts = products
        .filter((product) => product.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const fallingProducts = products
        .filter((product) => product.change.dir === "down")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    return (
        <>
            {/* Today's Rising Prices */}
            <section className="bg-[#f7faf7] py-14 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="mb-8">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">▲</span>

                            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                আজ দাম বেড়েছে
                            </h2>
                        </div>

                        <p className="mt-2 text-gray-600">
                            আজ যেসব পণ্যের দাম তুলনামূলকভাবে বেড়েছে।
                        </p>
                    </div>

                    {risingProducts.length > 0 ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                </div>
            </section>

            {/* Today's Falling Prices */}
            <section className="bg-white py-14 sm:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="mb-8">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl text-red-500">▼</span>

                            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                আজ দাম কমেছে
                            </h2>
                        </div>

                        <p className="mt-2 text-gray-600">
                            আজ যেসব পণ্যের দাম তুলনামূলকভাবে কমেছে।
                        </p>
                    </div>

                    {fallingProducts.length > 0 ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {fallingProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
                            আজ কোনো পণ্যের দাম কমেনি।
                        </p>
                    )}
                </div>
            </section>

            {/* All Products */}
            <section
                id="সব-পণ্য"
                className="bg-[#f7faf7] py-14 sm:py-16"
            >
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                            সব পণ্য
                        </h2>

                        <p className="mt-2 text-gray-600">
                            প্রয়োজনীয় সব পণ্যের আজকের বাজারদর এক নজরে দেখুন।
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default PriceSection;