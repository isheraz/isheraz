import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@^14.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-12-18.acacia' as any,
  httpClient: Stripe.createFetchHttpClient(),
})

Deno.serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature')
  
  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  const body = await req.text()
  const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''

  let event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      endpointSecret,
      undefined,
      Stripe.createCryptoProvider()
    )
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const tierId = session.metadata?.tier_id
    const customerEmail = session.customer_details?.email

    if (tierId) {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      // Get current inventory to decrement
      const { data: tier } = await supabase
        .from('consulting_tiers')
        .select('inventory_available')
        .eq('id', tierId)
        .single()

      if (tier && typeof tier.inventory_available === 'number') {
        const newInventory = Math.max(0, tier.inventory_available - 1)
        
        await supabase
          .from('consulting_tiers')
          .update({ inventory_available: newInventory })
          .eq('id', tierId)
      }

      // Log the client email if collected
      if (customerEmail) {
        await supabase
          .from('clients')
          .insert({
            email: customerEmail,
            tier_id: tierId,
            stripe_session_id: session.id,
          })
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})
