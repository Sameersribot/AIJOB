// import { Check, Zap } from 'lucide-react';
// import { useState } from 'react';
// import PricingCard from '../components/pricing/PricingCard';

// const monthlyPlans = [
//   {
//     name: 'Basic',
//     price: '$10',
//     description: 'Perfect for individuals starting their job search',
//     features: [
//       '25 AI-optimized applications per month',
//       'Basic job Search',
//       "Basic Job application",
//       'Email support'
//     ],
//     popular: false
//   },
//   {
//     name: 'Pro',
//     price: '$15',
//     description: 'Ideal for active job seekers',
//     features: [
//       'Upto 60 AI-optimized applications',
//       'Advanced job matching',
//       'Resume & cover letter optimization',
//       'Priority support'
//     ],
//     popular: true
//   },
//   {
//     name: 'Ultra',
//     price: '$25',
//     description: 'For Urgent Job need',
//     features: [
//       'All Pro features',
//       'Custom AI training',
//       'Upto 5 different resumes tested',
//       'Dedicated account manager',
//       '24/7 support'
//     ],
//     popular: false
//   }
// ];

// // Calculate quater prices (10% discount)
// const quaterPlans = monthlyPlans.map(plan => ({
//   ...plan,
//   price: plan.price === 'Custom' ? 'Custom' : 
//     `₹${Math.round(parseInt(plan.price.replace('$', '')) * 3 * 0.9)}`
// }));

// export default function Pricing() {
//   const [isquater, setIsquater] = useState(false);
//   const plans = isquater ? quaterPlans : monthlyPlans;

//   return (
//     <div className="relative overflow-hidden">
//       {/* Background decoration */}
//       <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
//       <div className="absolute inset-0">
//         <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-[100px]" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
//         <div className="text-center mb-20">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <Zap className="h-6 w-6 text-blue-600" />
//             <span className="text-blue-600 font-semibold">Pricing Plans</span>
//           </div>
//           <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 py-2">
//             Simple, Transparent Pricing
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Choose the perfect plan for your job search journey. Upgrade anytime.
//           </p>
//         </div>

//         {/* Billing toggle */}
//         <div className="mb-16 text-center">
//           <div 
//             onClick={() => setIsquater(!isquater)}
//             className="inline-flex items-center space-x-2 bg-gray-100 p-1 rounded-full cursor-pointer"
//           >
//             <span 
//               className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
//                 !isquater ? 'bg-white shadow-sm' : ''
//               }`}
//             >
//               Monthly billing
//             </span>
//             <span 
//               className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
//                 isquater ? 'bg-white shadow-sm' : ''
//               }`}
//             >
//               3 Months billing <span className="text-blue-600">(-10%)</span>
//             </span>
//           </div>
//         </div>
        
//         <div className="grid lg:grid-cols-3 gap-8 relative">
//           {plans.map((plan) => (
//             <div
//               key={plan.name}
//               className={`relative ${
//                 plan.popular ? 'lg:-mt-8 lg:mb-8' : ''
//               }`}
//             >
//               {plan.popular && (
//                 <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-semibold py-1 text-center shadow-lg">
//                   Most Popular
//                 </div>
//               )}
//               <PricingCard
//                 name={plan.name}
//                 price={plan.price}
//                 features={plan.features}
//                 description={plan.description}
//                 popular={plan.popular}
//                 isquater={isquater}
//               />
//             </div>
//           ))}
//         </div>

//         {/* FAQ Section */}
//         <div className="mt-24 text-center">
//           <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
//           <p className="text-gray-600 mb-12">
//             Have questions? We're here to help.
//           </p>
//           <div className="grid md:grid-cols-2 gap-8 text-left">
//             <div className="bg-white p-6 rounded-xl shadow-sm">
//               <h3 className="font-semibold mb-2">Can I change plans later?</h3>
//               <p className="text-gray-600">
//                 Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-sm">
//               <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
//               <p className="text-gray-600">
//                 We accept all major credit cards, debit cards, and UPI payments through our secure payment gateway.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Check, Zap } from 'lucide-react';
import { useState } from 'react';
import PricingCard from '../components/pricing/PricingCard';
import { useCurrency } from '../hooks/useCurrency';

const BASE_MONTHLY_PLANS = [
  {
    name: 'Basic',
    basePrice: 10,
    description: 'Perfect for individuals starting their job search',
    features: [
      'Upto 30 AI-optimized applications per month',
      'Basic job Search',
      "Basic Job application",
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Pro',
    basePrice: 15,
    description: 'Ideal for active job seekers',
    features: [
      'Upto 60 AI-optimized applications',
      'Advanced job matching',
      'Resume & cover letter optimization',
      'Priority support'
    ],
    popular: true
  },
  {
    name: 'Ultra',
    basePrice: 25,
    description: 'For Urgent Job need',
    features: [
      'All Pro features',
      'Custom Job Search',
      'Upto 5 different resumes tested',
      'Dedicated account manager',
      '24/7 support'
    ],
    popular: false
  }
];

export default function Pricing() {
  const [isQuarter, setIsQuarter] = useState(false);
  const { loading, convertPrice, formatPrice, currency } = useCurrency();

  const plans = BASE_MONTHLY_PLANS.map(plan => ({
    ...plan,
    price: formatPrice(convertPrice(plan.basePrice * (isQuarter ? 2.7 : 1))) // 2.7 = 3 months - 10% discount
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pricing information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="text-blue-600 font-semibold">Pricing Plans ({currency})</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 py-2">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your job search journey. Upgrade anytime.
          </p>
        </div>

        <div className="mb-16 text-center">
          <div 
            onClick={() => setIsQuarter(!isQuarter)}
            className="inline-flex items-center space-x-2 bg-gray-100 p-1 rounded-full cursor-pointer"
          >
            <span 
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                !isQuarter ? 'bg-white shadow-sm' : ''
              }`}
            >
              Monthly billing
            </span>
            <span 
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isQuarter ? 'bg-white shadow-sm' : ''
              }`}
            >
              3 Months billing <span className="text-blue-600">(-10%)</span>
            </span>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative ${
                plan.popular ? 'lg:-mt-8 lg:mb-8' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-semibold py-1 text-center shadow-lg">
                  Most Popular
                </div>
              )}
              <PricingCard
                name={plan.name}
                price={plan.price}
                features={plan.features}
                description={plan.description}
                popular={plan.popular}
                isquater={isQuarter}
                currency={currency}
              />
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-12">
            Have questions? We're here to help.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards and debit cards through our secure payment gateway.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}