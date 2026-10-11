import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type AllProductsProps = {
    products: Product[];
};

const AllProducts = ({ products }: AllProductsProps) => {
    return (
        <section
            id="সব-পণ্য"
            className="container mx-auto scroll-mt-24 px-4"
        >
            <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    সব পণ্য
                </h2>

                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    প্রয়োজনীয় সব পণ্যের আজকের বাজারদর এক নজরে দেখুন।
                </p>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <p className="rounded-xl bg-white p-6 text-center text-gray-500">
                    বর্তমানে কোনো পণ্য পাওয়া যায়নি।
                </p>
            )}
        </section>
    );
};

export default AllProducts;
