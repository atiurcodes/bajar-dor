
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

    const getLinkClass = (isActive: boolean) =>
        `inline-flex shrink-0 items-center whitespace-nowrap rounded-lg px-3 py-2.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:px-4 ${isActive
            ? "bg-green-700 font-semibold text-white"
            : "font-medium text-gray-600 hover:bg-green-100 hover:text-green-700"
        }`;

    return (
        <nav
            aria-label="পণ্যের ক্যাটাগরি"
            className="w-full min-w-0"
        >
            <div className="container mx-auto min-w-0 px-4">
                <div className="flex min-w-0 items-center gap-1.5 overflow-x-auto overscroll-x-contain sm:gap-2">
                    {/* All Products */}
                    <Link
                        href="/"
                        aria-current={pathname === "/" ? "page" : undefined}
                        className={getLinkClass(pathname === "/")}
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
                                aria-current={isActive ? "page" : undefined}
                                className={getLinkClass(isActive)}
                            >
                                <span className="mr-1.5" aria-hidden="true">
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
