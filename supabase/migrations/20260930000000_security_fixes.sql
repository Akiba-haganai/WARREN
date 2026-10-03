-- 1. Security check for accept answer
CREATE OR REPLACE FUNCTION accept_answer(p_answer_id UUID, p_question_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Verify ownership of the question
  IF NOT EXISTS (
    SELECT 1 FROM questions 
    WHERE id = p_question_id AND author_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Unauthorized: Only the question author can accept answers';
  END IF;

  -- Reset all answers for this question
  UPDATE answers SET is_accepted = false WHERE question_id = p_question_id;
  -- Accept the specific answer
  UPDATE answers SET is_accepted = true WHERE id = p_answer_id AND question_id = p_question_id;
END;
$$;

-- 2. Kick RLS on community_members
-- Drop existing policies on DELETE to avoid conflicts if any exist
DROP POLICY IF EXISTS "Users can leave communities" ON community_members;
DROP POLICY IF EXISTS "Admins can kick members" ON community_members;

-- Users can delete their own membership (leave)
CREATE POLICY "Users can leave communities"
ON community_members FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Admins/owners can kick others
CREATE POLICY "Admins can kick members"
ON community_members FOR DELETE
TO authenticated
USING (
  -- Caller is the creator of the community
  EXISTS (
    SELECT 1 FROM communities c 
    WHERE c.id = community_members.community_id 
    AND c.created_by = auth.uid()
  )
  OR
  -- Caller is a global admin or moderator
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() 
    AND p.role IN ('admin', 'moderator')
  )
);

-- 3. Poll voting data integrity
-- We need poll_id on chat_poll_votes to enforce uniqueness per poll
ALTER TABLE chat_poll_votes ADD COLUMN IF NOT EXISTS poll_id UUID REFERENCES chat_polls(id) ON DELETE CASCADE;

-- Backfill poll_id for existing votes
UPDATE chat_poll_votes v
SET poll_id = o.poll_id
FROM chat_poll_options o
WHERE v.option_id = o.id
AND v.poll_id IS NULL;

-- Make it NOT NULL for future inserts
ALTER TABLE chat_poll_votes ALTER COLUMN poll_id SET NOT NULL;

-- Add the unique constraint to prevent multi-voting
ALTER TABLE chat_poll_votes ADD CONSTRAINT chat_poll_votes_poll_user_unique UNIQUE (poll_id, user_id);
