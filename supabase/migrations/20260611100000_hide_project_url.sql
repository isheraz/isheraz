-- Add hide_url column to projects table
ALTER TABLE projects ADD COLUMN hide_url BOOLEAN DEFAULT false;
