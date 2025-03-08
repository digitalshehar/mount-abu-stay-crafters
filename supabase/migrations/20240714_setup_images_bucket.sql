
-- Create a storage bucket for images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
SELECT 'images', 'Hotel and room images', TRUE
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'images');

-- Create public policy for images bucket (for development)
-- Allow public read access to images
CREATE POLICY IF NOT EXISTS "Public read access to images" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'images');

-- Allow authenticated users to upload images
CREATE POLICY IF NOT EXISTS "Allow authenticated image uploads" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their own images
CREATE POLICY IF NOT EXISTS "Allow authenticated image updates" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their own images
CREATE POLICY IF NOT EXISTS "Allow authenticated image deletions" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- For development purposes, also allow anonymous access (can remove this in production)
CREATE POLICY IF NOT EXISTS "Allow anonymous image uploads during development" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'images');

CREATE POLICY IF NOT EXISTS "Allow anonymous image updates during development" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'images');

CREATE POLICY IF NOT EXISTS "Allow anonymous image deletions during development" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'images');
