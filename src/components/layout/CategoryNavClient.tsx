"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types/product";

interface CategoryNavClientProps {
    categories: Category[];
}

const CategoryNavClient = ({
    categories,
}: CategoryNavClientProps) => {
    const pathname = usePathname();

    return (
        <nav className="border-t border-green-100 bg-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-3">
                    {/* All Products */}
                    <Link
                        href="/"
                        className={
                            pathname === "/"
                                ? "shrink-0 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
                                : "shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                        }
                    >
                        সব পণ্য
                    </Link>

                    {/* Categories */}
                    {categories.map((category) => {
                        const isActive =
                            pathname === `/category/${category.slug}`;

                        return (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className={
                                    isActive
                                        ? "shrink-0 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
                                        : "shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                                }
                            >
                                <span className="mr-1.5">
                                    {category.icon}
                                </span>

                                {category.nameBn}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default CategoryNavClient;