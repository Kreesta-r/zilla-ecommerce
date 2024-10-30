import FeaturedProducts from '@/components/home/FeaturedProduct';
import Hero from '@/components/home/Hero';
import NewArrivals from '@/components/home/NewArrivals';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      <NewArrivals />
      <WhyChooseUs />
    </Layout>
  );
}