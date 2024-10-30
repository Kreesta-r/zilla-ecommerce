// pages/checkout/success.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if accessed directly
    if (!router.query.from) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [router]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. We'll send you an email with your order details and tracking information.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutSuccessPage;