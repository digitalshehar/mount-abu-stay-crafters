
-- Drop existing RLS policies for bookings if they exist
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.bookings;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.bookings;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.bookings;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.bookings;

-- Create better RLS policies
CREATE POLICY "Allow anyone to create bookings" 
  ON public.bookings 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow users to read their own bookings" 
  ON public.bookings 
  FOR SELECT 
  USING (auth.uid() = user_id OR auth.role() = 'service_role' OR user_id IS NULL);

CREATE POLICY "Allow users to update their own bookings" 
  ON public.bookings 
  FOR UPDATE 
  USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Allow users to delete their own bookings" 
  ON public.bookings 
  FOR DELETE 
  USING (auth.uid() = user_id OR auth.role() = 'service_role');
