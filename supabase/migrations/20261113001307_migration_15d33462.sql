-- Fix profiles table RLS policies
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO public
  WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO public
  USING ((SELECT auth.uid()) = id);

-- Fix user_quiz_answers table RLS policies
DROP POLICY IF EXISTS "Users can insert own quiz answers" ON user_quiz_answers;
DROP POLICY IF EXISTS "Users can view own quiz answers" ON user_quiz_answers;

CREATE POLICY "Users can insert own quiz answers"
  ON user_quiz_answers FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can view own quiz answers"
  ON user_quiz_answers FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);