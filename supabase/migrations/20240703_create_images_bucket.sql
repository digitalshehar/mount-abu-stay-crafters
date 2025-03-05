
-- Create a storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'Images for hotels, adventures, etc.', TRUE);

-- Create public policy for images bucket (for development)
CREATE POLICY "Public access to images" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'images');

CREATE POLICY "Allow image uploads" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow image updates" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'images');

CREATE POLICY "Allow image deletion" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'images');
