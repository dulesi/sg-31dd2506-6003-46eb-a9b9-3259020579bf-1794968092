-- Fix RLS policy for profiles
ALTER POLICY "Users can update own profile"
ON public.profiles
TO authenticated
USING ((SELECT auth.uid()) = id)
WITH CHECK ((SELECT auth.uid()) = id);

-- Create sync function for full_name to auth metadata
CREATE OR REPLACE FUNCTION public.sync_profile_full_name_to_auth_metadata()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb)
    || jsonb_build_object('full_name', NEW.full_name)
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS sync_profile_full_name_to_auth_metadata ON public.profiles;
CREATE TRIGGER sync_profile_full_name_to_auth_metadata
AFTER UPDATE OF full_name ON public.profiles
FOR EACH ROW
WHEN (OLD.full_name IS DISTINCT FROM NEW.full_name)
EXECUTE FUNCTION public.sync_profile_full_name_to_auth_metadata();