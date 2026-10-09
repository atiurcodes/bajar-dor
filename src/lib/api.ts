import type { Category, Product } from "@/types/product";

const BASE_URL =
    "https://api.abcz.workers.dev/api/bazardor";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

export async function getProduct(slug: string): Promise<Product> {
    const products = await getProducts();

    const product = products.find(
        (item) => item.slug === slug
    );

    if (!product) {
        throw new Error("Product not found");
    }

    const res = await fetch(
        `${BASE_URL}/products/${product.id}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch product details");
    }

    return res.json();
}

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE_URL}/categories`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    return res.json();
}

export async function getCategory(
    slug: string
): Promise<Category | null> {
    const res = await fetch(
        `${BASE_URL}/categories/${slug}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export async function getProductsByCategory(
    category: string
): Promise<Product[]> {
    const res = await fetch(
        `${BASE_URL}/products?category=${category}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch category products");
    }

    return res.json();
}