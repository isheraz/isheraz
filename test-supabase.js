require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const { data, count, error } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true });
    
  console.log('Result:', { count, error });
}
run();
