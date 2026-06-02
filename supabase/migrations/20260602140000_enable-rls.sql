-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE now_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE essays ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE consulting_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 1. Projects
CREATE POLICY "Allow public read-only access to projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Now Updates
CREATE POLICY "Allow public read-only access to now_updates" ON now_updates FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to now_updates" ON now_updates FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Essays
CREATE POLICY "Allow public read-only access to essays" ON essays FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to essays" ON essays FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Education
CREATE POLICY "Allow public read-only access to education" ON education FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to education" ON education FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Consulting Tiers
CREATE POLICY "Allow public read-only access to consulting_tiers" ON consulting_tiers FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to consulting_tiers" ON consulting_tiers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Subscribers
CREATE POLICY "Allow public insert to subscribers" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read/write to subscribers" ON subscribers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. Site Settings
CREATE POLICY "Allow public read-only access to site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
