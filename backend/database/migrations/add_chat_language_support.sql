-- Add multi-language and voice support to ai_conversations table
ALTER TABLE ai_conversations 
ADD COLUMN language VARCHAR(10) DEFAULT 'en',
ADD COLUMN is_voice BOOLEAN DEFAULT false,
ADD COLUMN quick_replies JSON;

-- Add index for faster queries
CREATE INDEX idx_ai_conversations_user_created ON ai_conversations(user_id, created_at DESC);
