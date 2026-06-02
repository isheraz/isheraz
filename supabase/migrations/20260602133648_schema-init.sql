-- 1. Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  tag VARCHAR(255),
  description TEXT NOT NULL,
  stack JSONB,
  status VARCHAR(50) NOT NULL,
  status_label VARCHAR(255),
  href VARCHAR(500),
  role VARCHAR(255),
  year INTEGER,
  is_featured BOOLEAN DEFAULT false,
  logo_text VARCHAR(10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_status ON projects(status);

-- 2. Now Updates Table
CREATE TABLE now_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag VARCHAR(50) NOT NULL,
  text TEXT NOT NULL,
  accent VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_now_active ON now_updates(is_active, sort_order);

-- 3. Essays Table
CREATE TABLE essays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  subtitle TEXT,
  category VARCHAR(100),
  read_time VARCHAR(50),
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_essays_published ON essays(is_published, published_at);

-- 4. Education Table (Polymorphic)
CREATE TYPE education_type AS ENUM ('tutorial', 'talk', 'resource');

CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  type education_type NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  meta_tags JSONB,
  content TEXT,
  external_url VARCHAR(500),
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_education_type ON education(type, sort_order);

-- 5. Consulting Tiers Table
CREATE TABLE consulting_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  price_label VARCHAR(50) NOT NULL,
  price_amount INTEGER,
  unit VARCHAR(50),
  description TEXT,
  features JSONB,
  cta_text VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  badge_text VARCHAR(100),
  
  inventory_total INTEGER,
  inventory_available INTEGER,
  stripe_product_id VARCHAR(255),
  stripe_price_id VARCHAR(255),
  
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- 6. Subscribers Table
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  source VARCHAR(100) DEFAULT 'newsletter_footer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Site Settings Table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bio_text TEXT,
  last_shipped_date TIMESTAMPTZ,
  is_accepting_projects BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_essays_updated_at
BEFORE UPDATE ON essays
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON site_settings
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
