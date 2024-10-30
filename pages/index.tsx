import Hero from '@/components/home/Hero';
// import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <Hero />
      {/* <FeaturedProducts /> */}
      <NewArrivals />
      <WhyChooseUs />
    </Layout>
  );
}