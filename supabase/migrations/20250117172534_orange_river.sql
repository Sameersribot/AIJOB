/*
  # Add job link to applications

  1. Changes
    - Add `job_link` column to `job_applications` table
    - Make it optional since some older entries might not have links
*/

ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS job_link text;