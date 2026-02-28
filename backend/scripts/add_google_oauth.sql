-- Add google_id column to users table for OAuth
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE;

-- Make password_hash nullable (OAuth users don't need password)
ALTER TABLE users MODIFY password_hash VARCHAR(255) NULL;
