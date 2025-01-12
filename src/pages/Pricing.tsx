import PricingCard from '../components/pricing/PricingCard';

const plans = [
  {
    name: 'Basic',
    price: '₹2999',
    description: 'Perfect for individuals starting their job search',
    features: [
      '10 AI-optimized applications per month',
      'Basic job matching',
      'Resume optimization',
      'Email support'
    ]
  },
  {
    name: 'Pro',
    price: '₹7999',
    description: 'Ideal for active job seekers',
    features: [
      'Unlimited AI-optimized applications',
      'Advanced job matching',
      'Resume & cover letter optimization',
      'Interview preparation',
      'Priority support'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organizations and teams',
    features: [
      'All Pro features',
      'Custom AI training',
      'Dedicated account manager',
      'API access',
      '24/7 support'
    ]
  }
];

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            features={plan.features}
            description={plan.description}
          />
        ))}
      </div>
    </div>
  );
}