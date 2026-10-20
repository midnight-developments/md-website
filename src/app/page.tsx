import HeroSection from "@/components/landing/hero/HeroSection";
import ValuePropsSection from "@/components/landing/value-props/ValuePropsSection";
import AccentSeparator from "@/components/ui/accent-separator";
import FeaturedProductsSection from "@/components/landing/featured-products/FeaturedProductsSection";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20">
      <HeroSection />
      <ValuePropsSection />
      <AccentSeparator />
      <FeaturedProductsSection />
    </div>
  );
}
