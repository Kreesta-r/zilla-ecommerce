import { useEffect, useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '../products/ProductCard';

// Define the type for the product
interface Product {
  id: number; // Assuming id is a number; change to string if necessary
  // Add other product properties here as needed, e.g.:
  name?: string;
  price?: number;
  image?: string;
}

// Specify the type for the shuffleArray function
const shuffleArray = (array: Product[]): Product[] => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const FeaturedProducts: React.FC = () => {
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]); // State holds an array of Product objects

  useEffect(() => {
    // Shuffle products only on the client
    const shuffled = shuffleArray(products);
    setShuffledProducts(shuffled.slice(0, 8));
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shuffledProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
