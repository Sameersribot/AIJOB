/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `message` (text, required)
      - `status` (text, default 'new')
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anyone to insert (public contact form)
    - Add policy for authenticated users to read their own submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact forms (public access)
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to read their own submissions if they're authenticated
CREATE POLICY "Users can read their own submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Allow service role to read all submissions (for admin purposes)
CREATE POLICY "Service role can read all submissions"
  ON contact_submissions
  FOR SELECT
  TO service_role
  USING (true);