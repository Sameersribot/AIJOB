import { Check } from 'lucide-react';
import { useRazorpay } from '../../hooks/useRazorpay';
import { useUser } from '../../context/UserContext';

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  description: string;
  popular?: boolean;
  isquater?: boolean;
}

export default function PricingCard({ 
  name, 
  price, 
  features, 
  description, 
  popular = false,
  isquater = false 
}: PricingCardProps) {
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

      // Pass billing period to payment handler
      await handlePayment({ 
        name, 
        price, 
        description,
        billingPeriod: isquater ? 'quater' : 'monthly'
      });
    } catch (error) {
      console.error('Subscription error:', error);
      alert(error instanceof Error ? error.message : 'Failed to process subscription. Please try again.');
    }
  };

  return (
    <div
      className={`h-full bg-white rounded-2xl shadow-xl transition-transform hover:scale-105 ${
        popular ? 'ring-2 ring-blue-600' : ''
      }`}
    >
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-gray-600 ml-2">
            {price !== 'Custom' && (isquater ? '/3 months' : '/month')}
          </span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <button
          onClick={handleSubscribe}
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            popular
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-black text-white hover:bg-gray-800'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading ? 'Processing...' : price === 'Custom' ? 'Contact Sales' : 'Get Started'}
        </button>
      </div>
      <div className="border-t border-gray-100 p-8">
        <ul className="space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}