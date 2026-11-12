-- Fix RLS policies for user_quiz_answers table
DROP POLICY IF EXISTS "Users can insert own quiz answers" ON user_quiz_answers;
DROP POLICY IF EXISTS "Users can view own quiz answers" ON user_quiz_answers;

-- Create correct policies with auth.uid()
CREATE POLICY "Users can insert own quiz answers"
  ON user_quiz_answers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own quiz answers"
  ON user_quiz_answers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);