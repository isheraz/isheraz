CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  tier_id UUID REFERENCES public.consulting_tiers(id) ON DELETE SET NULL,
  stripe_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can see clients
CREATE POLICY "Enable read access for authenticated" 
  ON public.clients FOR SELECT
  USING (
    (auth.role() = 'authenticated')
  );

-- Only service role (webhook) can insert clients
CREATE POLICY "Enable insert for service role" 
  ON public.clients FOR INSERT 
  WITH CHECK (true);
