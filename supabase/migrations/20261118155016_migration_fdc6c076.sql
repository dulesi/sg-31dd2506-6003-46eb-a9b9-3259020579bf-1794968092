-- Drop all existing RLS policies and recreate with correct permissions
DROP POLICY IF EXISTS "Users can insert own quiz answers" ON user_quiz_answers;
DROP POLICY IF EXISTS "Users can view own quiz answers" ON user_quiz_answers;
DROP POLICY IF EXISTS "anon_insert_quiz" ON user_quiz_answers;

-- Enable RLS if not already enabled
ALTER TABLE user_quiz_answers ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to INSERT their own quiz answers
CREATE POLICY "authenticated_insert_quiz"
  ON user_quiz_answers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to SELECT their own quiz answers
CREATE POLICY "authenticated_select_quiz"
  ON user_quiz_answers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow anon users to INSERT quiz answers during registration
CREATE POLICY "anon_insert_quiz"
  ON user_quiz_answers
  FOR INSERT
  TO anon
  WITH CHECK (user_id = (auth.jwt() ->> 'sub')::uuid);