-- Fix RLS policy for user_quiz_answers to use auth.uid() instead of uid()
DROP POLICY IF EXISTS "Users can insert own quiz answers" ON user_quiz_answers;
DROP POLICY IF EXISTS "Users can view own quiz answers" ON user_quiz_answers;

CREATE POLICY "Users can insert own quiz answers"
  ON user_quiz_answers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own quiz answers"
  ON user_quiz_answers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);