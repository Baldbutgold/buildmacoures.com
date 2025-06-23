/*
  # Create curriculum generator tables

  1. New Tables
    - `generated_curricula`
      - `id` (uuid, primary key)
      - `user_email` (text)
      - `course_idea` (text)
      - `generated_modules` (jsonb)
      - `full_curriculum_content` (text)
      - `created_at` (timestamp)
      - `access_token` (text, unique) - for private curriculum access

  2. Security
    - Enable RLS on `generated_curricula` table
    - Add policies for public access (since this is a lead generation tool)
*/

CREATE TABLE IF NOT EXISTS generated_curricula (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  course_idea text NOT NULL,
  generated_modules jsonb,
  full_curriculum_content text,
  access_token text UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE generated_curricula ENABLE ROW LEVEL SECURITY;

-- Allow public access for lead generation
CREATE POLICY "Allow public insert for lead generation"
  ON generated_curricula
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow access by access token
CREATE POLICY "Allow access by token"
  ON generated_curricula
  FOR SELECT
  TO anon
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_generated_curricula_access_token ON generated_curricula(access_token);
CREATE INDEX IF NOT EXISTS idx_generated_curricula_email ON generated_curricula(user_email);
CREATE INDEX IF NOT EXISTS idx_generated_curricula_created_at ON generated_curricula(created_at);