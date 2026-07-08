import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FlashSale } from "@/components/home/FlashSale";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromoBanner } from "@/components/home/PromoBanner";
import { BestSellerCarousel } from "@/components/home/BestSellerCarousel";
import { BrandSection } from "@/components/home/BrandSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FlashSale />
      <FeaturedProducts />
      <PromoBanner />
      <BestSellerCarousel />
      <BrandSection />
      <WhyChooseUs />
      <Newsletter />
    </>
  );
}
