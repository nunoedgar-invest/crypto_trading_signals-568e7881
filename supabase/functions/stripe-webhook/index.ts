import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const stripe = new (await import('npm:stripe@14.21.0')).default(
  Deno.env.get('STRIPE_SECRET_KEY') ?? '',
  {
    apiVersion: '2023-10-16',
  }
)

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const signature = req.headers.get('stripe-signature')
  const body = await req.text()
  
  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object
        
        // Get customer details
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        
        // Upsert customer
        await supabase
          .from('customers')
          .upsert({
            stripe_customer_id: customer.id,
            email: customer.email,
          })
        
        // Upsert subscription
        await supabase
          .from('subscriptions')
          .upsert({
            stripe_subscription_id: subscription.id,
            customer_id: (await supabase
              .from('customers')
              .select('id')
              .eq('stripe_customer_id', customer.id)
              .single()).data?.id,
            status: subscription.status,
            price_id: subscription.items.data[0].price.id,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
        
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object
        
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', deletedSubscription.id)
        
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response('ok', { headers: corsHeaders })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response('Error processing webhook', { status: 500 })
  }
})