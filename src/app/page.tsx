import { getProducts } from "@/lib/api";
import AllProducts from "@/components/home/AllProducts";
import FallingPrices from "@/components/home/FallingPrices";
import Hero from "@/components/home/Hero";
import RisingPrices from "@/components/home/RisingPrices";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen space-y-10 py-4 sm:space-y-12 sm:py-6">
      <Hero />
      <RisingPrices products={products} />
      <FallingPrices products={products} />
      <AllProducts products={products} />
    </main>
  );
}
