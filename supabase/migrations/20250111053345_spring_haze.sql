/*
  # Create payments table

  1. New Tables
    - `payments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `payment_id` (text, Razorpay payment ID)
      - `order_id` (text, Razorpay order ID)
      - `signature` (text, Razorpay signature)
      - `amount` (numeric, payment amount)
      - `status` (text, payment status)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `payments` table
    - Add policies for authenticated users to insert and read their own payments
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  payment_id text NOT NULL,
  order_id text NOT NULL,
  signature text NOT NULL,
  amount numeric NOT NULL,
  currency text NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);