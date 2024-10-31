import FeaturedProducts from '@/components/home/FeaturedProduct';
import Hero from '@/components/home/Hero';
import NewArrivals from '@/components/home/NewArrivals';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Layout from '@/components/layout/Layout';
import Banner from '@/components/home/Banner';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Banner/>
      <FeaturedProducts />
      <NewArrivals />
      <WhyChooseUs />
    </Layout>
  );
}