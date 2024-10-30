// pages/products/[id].js
import { useRouter } from 'next/router';
import useCartStore from '@/store/cartStore';
import { products } from '@/data/products';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const addItem = useCartStore((state) => state.addItem);
  
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-[600px]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl mb-4">${product.price}</p>
          <p className="mb-6">{product.description}</p>
          
          {/* Size selector */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Select Size</h3>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="border px-4 py-2 hover:bg-gray-100"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => addItem(product)}
            className="w-full bg-black text-white py-3 px-6 hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;