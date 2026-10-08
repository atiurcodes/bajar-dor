import type { Category, Product } from "@/types/product";

const BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Products fetch failed");
  }

  return response.json();
}

export async function getProduct(
  id: string
): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Product fetch failed");
  }

  return response.json();
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `${BASE_URL}/products?category=${category}`
  );

  if (!response.ok) {
    throw new Error("Category products fetch failed");
  }

  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Categories fetch failed");
  }

  return response.json();
}

export async function getCategory(
  slug: string
): Promise<Category> {
  const response = await fetch(`${BASE_URL}/categories/${slug}`);

  if (!response.ok) {
    throw new Error("Category fetch failed");
  }

  return response.json();
}