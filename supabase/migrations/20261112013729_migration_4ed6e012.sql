-- Enable RLS and create INSERT policy for authenticated users
ALTER TABLE user_quiz_answers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can insert own quiz answers" ON user_quiz_answers;
DROP POLICY IF EXISTS "Users can view own quiz answers" ON user_quiz_answers;

-- Create new policies
CREATE POLICY "Users can insert own quiz answers"
  ON user_quiz_answers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own quiz answers"
  ON user_quiz_answers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);