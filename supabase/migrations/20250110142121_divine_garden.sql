/*
  # Add storage policies for resumes

  1. Security
    - Enable storage policies for the resumes bucket
    - Add policies for authenticated users to:
      - Upload their own resumes
      - Read their own resumes
*/

-- Create storage policies for the resumes bucket
BEGIN;

-- Policy to allow authenticated users to upload files to their own folder
CREATE POLICY "Users can upload their own resumes"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'resumes' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow users to read their own resumes
CREATE POLICY "Users can read their own resumes"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'resumes' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

COMMIT;