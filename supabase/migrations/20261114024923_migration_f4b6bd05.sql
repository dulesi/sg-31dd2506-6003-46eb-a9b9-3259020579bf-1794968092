-- Grant INSERT permission to anon role for user_quiz_answers
GRANT INSERT ON user_quiz_answers TO anon;
GRANT SELECT ON user_quiz_answers TO anon;

-- Create RLS policy for anon role to allow inserting own quiz answers
CREATE POLICY "Anon users can insert quiz answers during signup"
  ON user_quiz_answers
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Allow insert if the user_id matches the user in the JWT claim
    user_id = (SELECT auth.jwt() ->> 'sub')::uuid
  );