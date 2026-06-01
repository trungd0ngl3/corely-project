import HeroBanner from "../components/home/HeroBanner";
import CategoryGrid from "../components/home/CategoryGrid";
import FlashSale from "../components/home/FlashSale";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PrebuiltPCSection from "../components/home/PrebuiltPCSection";
import BrandShowcase from "../components/home/BrandShowcase";
import Newsletter from "../components/home/Newsletter";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <CategoryGrid />
      <FlashSale />
      <FeaturedProducts />
      <PrebuiltPCSection />
      <BrandShowcase />
      <Newsletter />
    </>
  );
}