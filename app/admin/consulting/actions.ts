'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'

export async function deleteConsultingTier(id: string) {
  const supabase = await createClient()
  await supabase.from('consulting_tiers').delete().eq('id', id)
  revalidatePath('/admin/consulting')
  revalidatePath('/', 'layout')
}

export async function createConsultingTier(formData: FormData) {
  const supabase = await createClient()
  
  const payload: any = {
    name: formData.get('name'),
    unit: formData.get('unit'),
    badge_text: formData.get('badge_text') || null,
    description: formData.get('description'),
    features: JSON.parse(formData.get('features') as string || '[]'),
    cta_text: formData.get('cta_text'),
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
    is_featured: formData.get('is_featured') === 'on',
  }
  
  let priceLabel = formData.get('price_label') as string;
  let providedProductId = formData.get('stripe_product_id') as string | null;
  let providedPriceId = formData.get('stripe_price_id') as string | null;

  if (providedProductId !== null) {
    payload.stripe_product_id = providedProductId.trim() !== '' ? providedProductId.trim() : null;
  }
  if (providedPriceId !== null) {
    payload.stripe_price_id = providedPriceId.trim() !== '' ? providedPriceId.trim() : null;
  }

  if (process.env.STRIPE_SECRET_KEY) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2024-12-18.acacia' as any
    })
    
    try {
      if (providedProductId && providedProductId.trim() !== '') {
        // User provided an existing Product ID, fetch it dynamically
        const product = await stripe.products.retrieve(providedProductId, { expand: ['default_price'] });
        const defaultPrice = product.default_price as Stripe.Price;
        
        if (defaultPrice) {
          payload.stripe_product_id = product.id;
          payload.stripe_price_id = defaultPrice.id;
          
          // Auto-format price_label from the Stripe price if not explicitly provided
          if (!priceLabel && defaultPrice.unit_amount) {
            priceLabel = new Intl.NumberFormat('en-US', { style: 'currency', currency: defaultPrice.currency.toUpperCase(), minimumFractionDigits: 0 }).format(defaultPrice.unit_amount / 100);
          }
        }
      } else {
        // Create a brand new product
        const numericPrice = parseInt((priceLabel || '').replace(/[^0-9]/g, '')) * 100;
        
        if (numericPrice > 0) {
          const product = await stripe.products.create({
            name: payload.name,
            description: payload.description || '',
          });
          
          const price = await stripe.prices.create({
            product: product.id,
            unit_amount: numericPrice,
            currency: 'usd',
          });
          
          payload.stripe_product_id = product.id;
          payload.stripe_price_id = price.id;
        }
      }
    } catch (e) {
      console.error("Error creating/fetching Stripe product:", e);
    }
  }

  payload.price_label = priceLabel;

  const { error } = await supabase.from('consulting_tiers').insert(payload)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/consulting')
  revalidatePath('/', 'layout')
  redirect('/admin/consulting')
}

export async function updateConsultingTier(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const payload: any = {
    name: formData.get('name'),
    unit: formData.get('unit'),
    badge_text: formData.get('badge_text') || null,
    description: formData.get('description'),
    features: JSON.parse(formData.get('features') as string || '[]'),
    cta_text: formData.get('cta_text'),
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
    is_featured: formData.get('is_featured') === 'on',
    inventory_available: formData.get('inventory_available') ? parseInt(formData.get('inventory_available') as string, 10) : null
  }

  let priceLabel = formData.get('price_label') as string;
  let providedProductId = formData.get('stripe_product_id') as string | null;
  let providedPriceId = formData.get('stripe_price_id') as string | null;

  if (providedProductId !== null) {
    payload.stripe_product_id = providedProductId.trim() !== '' ? providedProductId.trim() : null;
  }
  if (providedPriceId !== null) {
    payload.stripe_price_id = providedPriceId.trim() !== '' ? providedPriceId.trim() : null;
  }

  if (process.env.STRIPE_SECRET_KEY && providedProductId && providedProductId.trim() !== '') {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2024-12-18.acacia' as any
    })
    
    try {
      const product = await stripe.products.retrieve(providedProductId, { expand: ['default_price'] });
      const defaultPrice = product.default_price as Stripe.Price;
      
      if (defaultPrice) {
        payload.stripe_product_id = product.id;
        payload.stripe_price_id = defaultPrice.id;
        
        if (!priceLabel && defaultPrice.unit_amount) {
          priceLabel = new Intl.NumberFormat('en-US', { style: 'currency', currency: defaultPrice.currency.toUpperCase(), minimumFractionDigits: 0 }).format(defaultPrice.unit_amount / 100);
        }
      }
    } catch (e) {
      console.error("Error fetching from Stripe:", e);
    }
  }

  // Update price_label only if it's set
  if (priceLabel !== undefined && priceLabel !== null) {
    payload.price_label = priceLabel;
  }

  const { error } = await supabase.from('consulting_tiers').update(payload).eq('id', id)
  
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/consulting')
  revalidatePath('/', 'layout')
  redirect('/admin/consulting')
}
