import { notFound } from "next/navigation";
import { getCategory, getProductsByCategory } from "@/lib/api";
import CategoryProductList from "@/components/category/CategoryProductList";

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CategoryPage({
    params,
}: CategoryPageProps) {
    const { slug } = await params;

    const [category, products] = await Promise.all([
        getCategory(slug),
        getProductsByCategory(slug),
    ]);

    if (!category) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#f7faf7] py-5 sm:py-8 md:py-10 lg:py-14">
            <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
                <div className="mb-5 rounded-2xl border border-green-100 bg-white p-4 sm:mb-6 sm:p-6 md:mb-8 md:p-8">
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        <span className="shrink-0 text-3xl sm:text-4xl md:text-5xl">
                            {category.icon}
                        </span>

                        <div className="min-w-0 flex-1">
                            <h1 className="break-words text-xl font-extrabold text-gray-900 sm:text-2xl md:text-3xl">
                                {category.nameBn}
                            </h1>

                            <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:mt-2 sm:text-sm">
                                {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের বাজারদর
                            </p>
                        </div>
                    </div>
                </div>

                <CategoryProductList products={products} />
            </div>
        </main>
    );
}
