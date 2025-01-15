import { supabase } from './supabase';

export interface PaymentOptions {
  amount: number;
  currency?: string;
  name: string;
  description: string;
  orderId: string;
  email: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const checkServer = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const initializePayment = async (options: PaymentOptions): Promise<void> => {
  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      throw new Error('Failed to load payment gateway. Please refresh and try again.');
    }

    const serverRunning = await checkServer();
    if (!serverRunning) {
      throw new Error('Payment server is not running. Please start the server with: npm run server');
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Please log in to make a payment');
    }

    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      throw new Error('Payment gateway configuration is missing');
    }

    // Create order from backend
    const orderResponse = await fetch(`${API_BASE_URL}/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: options.amount,
        currency: options.currency || 'INR',
      }),
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      throw new Error(errorData.error || 'Failed to create order');
    }

    const orderData = await orderResponse.json();

    const razorpay = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: options.amount * 100,
      currency: options.currency || 'INR',
      name: options.name,
      description: options.description,
      order_id: orderData.id,
      handler: async function (response: any) {
        try {
          // Verify payment signature
          const verifyResponse = await fetch(`${API_BASE_URL}/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed');
          }

          const verifyData = await verifyResponse.json();
          if (!verifyData.verified) {
            throw new Error('Invalid payment signature');
          }

          // Extract plan details and billing period from the description
          const [planName, planInfo] = options.description.split(' - ');
          const billingPeriod = planInfo.includes('(quater)') ? 'quater' : 'monthly';
          
          const planDetails = {
            Basic: { limit: 25, days: billingPeriod === 'quater' ? 90 : 30 },
            Pro: { limit: 60, days: billingPeriod === 'quater' ? 90 : 30 },
            Ultra: { limit: 1000, days: billingPeriod === 'quater' ? 90 : 30 }
          };

          const plan = planDetails[planName.replace(' Plan', '') as keyof typeof planDetails];
          if (!plan) {
            throw new Error('Invalid plan selected');
          }

          // Calculate subscription end date based on billing period
          const endDate = new Date();
          endDate.setDate(endDate.getDate() + plan.days);

          // First, save the payment details
          const { error: paymentError } = await supabase
            .from('payments')
            .insert({
              user_id: user.id,
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              amount: options.amount,
              status: 'completed'
            });

          if (paymentError) {
            console.error('Error saving payment:', paymentError);
            throw new Error('Failed to save payment details');
          }

          // Then, update the subscription
          const { error: subscriptionError } = await supabase
            .from('user_subscriptions')
            .upsert({
              user_id: user.id,
              plan_name: planName.replace(' Plan', ''),
              applications_limit: plan.limit,
              start_date: new Date().toISOString(),
              end_date: endDate.toISOString(),
              status: 'active'
            }, {
              onConflict: 'user_id'
            });

          if (subscriptionError) {
            console.error('Error saving subscription:', subscriptionError);
            throw new Error('Failed to update subscription');
          }

          // Redirect to profile page
          window.location.href = '/profile';
        } catch (error) {
          console.error('Error processing payment:', error);
          alert(error instanceof Error ? error.message : 'Payment successful but failed to save details. Please contact support.');
        }
      },
      prefill: {
        email: user.email || options.email,
        name: user.user_metadata?.full_name || '',
      },
      modal: {
        ondismiss: function() {
          console.log('Payment cancelled by user');
        }
      },
      theme: {
        color: '#000000',
      },
    });

    razorpay.open();
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw error;
  }
};