/*
  # Create Love Results Table

  1. New Tables
    - `love_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name1` (text)
      - `name2` (text)
      - `score` (integer)
      - `message` (text)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `love_results` table
    - Add policies for authenticated users to:
      - Read their own saved results
      - Insert their own results
      - Delete their own results
*/

CREATE TABLE IF NOT EXISTS love_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name1 text NOT NULL,
  name2 text NOT NULL,
  score integer NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE love_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved results"
  ON love_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own results"
  ON love_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own results"
  ON love_results FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);