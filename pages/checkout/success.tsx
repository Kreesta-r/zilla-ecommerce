import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CheckCircle, ShoppingBag, ArrowRight, Mail } from 'lucide-react';

const CheckoutSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.from) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
        <div className="relative">
          {/* Animated success circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-green-500 animate-[ping_1s_ease-in-out]" />
          </div>
          
          {/* Success icon */}
          <div className="relative flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-[bounce_1s_ease-in-out]">
              <CheckCircle size={48} className="text-green-500" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank you for your order!
        </h1>
        
        <p className="text-gray-600 mb-8">
          We've received your order and we'll start processing it right away.
        </p>

        {/* Order info cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-indigo-50 rounded-xl p-4">
            <div className="flex items-center justify-center mb-2">
              <Mail className="text-indigo-600 w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Order Confirmation</h3>
            <p className="text-xs text-gray-500">Check your email for order details</p>
          </div>
          
          <div className="bg-indigo-50 rounded-xl p-4">
            <div className="flex items-center justify-center mb-2">
              <ShoppingBag className="text-indigo-600 w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Order Updates</h3>
            <p className="text-xs text-gray-500">We'll notify you when your order ships</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <button
            onClick={() => router.push('/account/orders')}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>View Order Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full bg-white text-indigo-600 px-6 py-3 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>

        {/* Progress bar for auto-redirect */}
        {!router.query.from && (
          <div className="mt-8">
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full animate-[progress_5s_linear]" />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to home page...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;