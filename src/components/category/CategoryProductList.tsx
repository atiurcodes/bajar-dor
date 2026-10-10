
"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import ProductCard from "@/components/home/ProductCard";

interface CategoryProductListProps {
    products: Product[];
}

type SortOption = "default" | "low-to-high" | "high-to-low";

export default function CategoryProductList({
    products,
}: CategoryProductListProps) {
    const [sortBy, setSortBy] = useState<SortOption>("default");

    const sortedProducts = useMemo(() => {
        const result = [...products];

        if (sortBy === "low-to-high") {
            result.sort((a, b) => a.today - b.today);
        }

        if (sortBy === "high-to-low") {
            result.sort((a, b) => b.today - a.today);
        }

        return result;
    }, [products, sortBy]);

    return (
        <section>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-600">
                    মোট{" "}
                    <span className="font-bold text-gray-900">
                        {products.length.toLocaleString("bn-BD")}
                    </span>{" "}
                    টি পণ্য
                </p>

                <div className="flex items-center gap-3">
                    <label
                        htmlFor="category-sort"
                        className="shrink-0 text-sm font-medium text-gray-700"
                    >
                        সাজান:
                    </label>

                    <select
                        id="category-sort"
                        value={sortBy}
                        onChange={(event) =>
                            setSortBy(event.target.value as SortOption)
                        }
                        className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-500 sm:flex-none"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="low-to-high">
                            কম দাম থেকে বেশি
                        </option>
                        <option value="high-to-low">
                            বেশি দাম থেকে কম
                        </option>
                    </select>
                </div>
            </div>

            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-3 gap-5">
                    {sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
                    <p className="text-4xl">🛒</p>

                    <h2 className="mt-4 text-lg font-bold text-gray-900">
                        এই ক্যাটাগরিতে কোনো পণ্য নেই
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        অন্য ক্যাটাগরি থেকে পণ্য দেখুন।
                    </p>
                </div>
            )}
        </section>
    );
}