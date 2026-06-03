import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@^14.0.0'

const ALLOWED_ORIGINS = ['http://localhost:3000', 'https://isheraz.com']

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('Origin')
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { tier_id, return_url } = await req.json()

    if (!tier_id) {
      throw new Error('tier_id is required')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { data: tier, error } = await supabase
      .from('consulting_tiers')
      .select('stripe_price_id')
      .eq('id', tier_id)
      .single()

    if (error || !tier?.stripe_price_id) {
      throw new Error('Tier not found or missing Stripe price ID')
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2024-12-18.acacia' as any,
      httpClient: Stripe.createFetchHttpClient(),
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_creation: 'always',
      line_items: [
        {
          price: tier.stripe_price_id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${return_url}?success=true`,
      cancel_url: `${return_url}?canceled=true`,
      metadata: {
        tier_id,
      }
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
