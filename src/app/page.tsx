import LandingLayout from "@/components/landing/LandingLayout";
import { getFeaturedProducts } from "@/services/tebex/products";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return <LandingLayout featuredProducts={featuredProducts} />;
}
