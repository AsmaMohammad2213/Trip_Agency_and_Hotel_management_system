import React from 'react';
import { Shield, Globe, CreditCard, Headphones } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-12 w-12 text-blue-600" />,
    title: 'Secure Booking',
    description: 'Your bookings are protected with our secure payment system and comprehensive travel insurance options.'
  },
  {
    icon: <Globe className="h-12 w-12 text-blue-600" />,
    title: 'Global Coverage',
    description: 'Access to thousands of destinations worldwide with local expertise and insider knowledge.'
  },
  {
    icon: <CreditCard className="h-12 w-12 text-blue-600" />,
    title: 'Best Price Guarantee',
    description: 'We guarantee the best prices for your travel needs with our price match policy.'
  },
  {
    icon: <Headphones className="h-12 w-12 text-blue-600" />,
    title: '24/7 Support',
    description: 'Our dedicated support team is available round the clock to assist you with any queries.'
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose TravelEase?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide everything you need for a perfect travel experience, from booking to support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}