
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
        <main className="min-h-screen bg-[#f7faf7] py-10 sm:py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-8 rounded-2xl border border-green-100 bg-white p-6 sm:p-8">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl sm:text-5xl">
                            {category.icon}
                        </span>

                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                {category.nameBn}
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                এই ক্যাটাগরির পণ্যের আজকের বাজারদর
                            </p>
                        </div>
                    </div>
                </div>

                <CategoryProductList products={products} />
            </div>
        </main>
    );
}