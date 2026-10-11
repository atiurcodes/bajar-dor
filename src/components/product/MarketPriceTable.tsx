
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import ProductSummary from "@/components/product/ProductSummary";

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const ProductPage = async ({
    params,
}: ProductPageProps) => {
    const { slug } = await params;

    let product;

    try {
        product = await getProduct(slug);
    } catch {
        notFound();
    }

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#f7faf7] py-4 sm:py-6 md:py-8">
            <ProductSummary product={product} />
        </main>
    );
};

export default ProductPage;
