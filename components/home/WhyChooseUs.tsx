import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $50',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Safe & secure checkout experience',
    iconColor: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy for your peace of mind',
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer service',
    iconColor: 'text-pink-500',
    bgColor: 'bg-pink-50'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 ${feature.bgColor}`}
          >
            <div
              className={`flex justify-center mb-4 p-3 rounded-full ${feature.bgColor}`}
            >
              <feature.icon size={32} className={`${feature.iconColor}`} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;