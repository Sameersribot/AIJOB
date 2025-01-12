import { Check } from 'lucide-react';
import { useRazorpay } from '../../hooks/useRazorpay';
import { useUser } from '../../context/UserContext';

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  description: string;
}

export default function PricingCard({ name, price, features, description }: PricingCardProps) {
  const { handlePayment, isLoading } = useRazorpay();
  const { user } = useUser();

  const handleSubscribe = async () => {
    try {
      if (price === 'Custom') {
        window.location.href = '/contact';
        return;
      }

      if (!user) {
        alert('Please log in to subscribe to a plan');
        return;
      }

      await handlePayment({ name, price, description });
    } catch (error) {
      console.error('Subscription error:', error);
      alert(error instanceof Error ? error.message : 'Failed to process subscription. Please try again.');
    }
  };

  return (
    <div className="border rounded-lg p-8 space-y-6 hover:shadow-lg transition-shadow">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-4xl font-bold mt-4">{price}</p>
        {price !== 'Custom' && <span className="text-gray-600">/month</span>}
      </div>
      
      <ul className="space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-center space-x-3">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={handleSubscribe}
        disabled={isLoading}
        className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : price === 'Custom' ? 'Contact Sales' : 'Subscribe Now'}
      </button>
    </div>
  );
}