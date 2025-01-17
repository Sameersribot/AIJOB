import { useState } from 'react';
import { initializePayment, PaymentOptions } from '../lib/razorpay';
import { supabase } from '../lib/supabase';

interface PlanDetails {
  name: string;
  price: string;
  description: string;
  billingPeriod?: 'monthly' | 'quater';
}

// Function to generate an order ID (in production, this should come from your backend)
const generateOrderId = () => {
  return 'order_' + Math.random().toString(36).substr(2, 9) + Date.now();
};

export function useRazorpay() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (planDetails: PlanDetails) => {
    try {
      setIsLoading(true);

      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please log in to make a payment');
      }

      // Remove the ₹ symbol and convert to number
      const amount = parseInt(planDetails.price.replace('₹', '').replace(/,/g, ''));
      if (isNaN(amount)) {
        throw new Error('Invalid price format');
      }
      
      // In production, order creation should happen on the backend
      const mockOrderId = generateOrderId();
      
      const options: PaymentOptions = {
        amount,
        name: 'Ovalpod',
        description: `${planDetails.name} Plan - ${planDetails.description} (${planDetails.billingPeriod || 'monthly'})`,
        orderId: mockOrderId,
        email: user.email || '',
      };

      // Initialize Razorpay payment
      await initializePayment(options);
    } catch (error) {
      console.error('Payment error:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Something went wrong with the payment. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handlePayment, isLoading };
}