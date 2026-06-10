-- Add fields to essays table
ALTER TABLE essays ADD COLUMN IF NOT EXISTS linkedin_post_url VARCHAR(500);
ALTER TABLE essays ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0;

-- Function to securely increment likes without a race condition
CREATE OR REPLACE FUNCTION increment_essay_likes(essay_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE essays
  SET likes_count = COALESCE(likes_count, 0) + 1
  WHERE id = essay_id;
END;
$$;
