require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const email = `test-${Date.now()}@example.com`;
  const { data, error } = await supabase.from('subscribers').insert([{ email }]);
  console.log('Insert:', { error });
  
  const { count } = await supabase.from('subscribers').select('*', { count: 'exact', head: true });
  console.log('Count after insert:', count);
}
run();
