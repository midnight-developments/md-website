import HeroSection from "@/components/landing/hero/HeroSection";
import ValuePropsSection from "@/components/landing/value-props/ValuePropsSection";
import AccentSeparator from "@/components/ui/accent-separator";
import FeaturedProductsSection from "@/components/landing/featured-products/FeaturedProductsSection";

export default function HomePage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 pt-10 md:pt-12 2xl:pt-16">
      <HeroSection />
      <ValuePropsSection />
      <AccentSeparator />
      <FeaturedProductsSection />
    </div>
  );
}
