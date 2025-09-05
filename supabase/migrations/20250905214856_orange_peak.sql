/*
  # Fix profiles table INSERT policy

  1. Changes
    - Drop the existing incorrect INSERT policy for profiles table
    - Create a new INSERT policy that allows authenticated users to create their own profile
    - The policy uses auth.uid() = id to ensure users can only create profiles for themselves

  2. Security
    - Maintains RLS protection while allowing proper profile creation
    - Users can only insert profiles with their own auth.uid() as the id
*/

-- Drop the existing incorrect INSERT policy
DROP POLICY IF EXISTS "Users can create own profile" ON profiles;

-- Create the correct INSERT policy
CREATE POLICY "Users can create own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);