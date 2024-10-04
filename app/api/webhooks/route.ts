import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import {  createUser, deleteUser, updateUser } from '@/lib/actions/user.action'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET
  console.log("WEBHOOK_SECRET",WEBHOOK_SECRET)

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type
  console.log('event type::', eventType)
  if(eventType === 'user.created') {
    const {id,first_name, last_name,email_addresses,image_url} = evt.data
    console.log('user data', evt.data)

   await createUser({
        clerkId:id,
        name: `${first_name} ${last_name ? last_name : ''}`,
        email: email_addresses[0].email_address,
        imgUrl: image_url,
    })
    
    return NextResponse.json({message: "OK"},{status:200})
  }else if(eventType === 'user.updated') {
    const {id,first_name, last_name,email_addresses,image_url} = evt.data
    const updatedUser = await updateUser({
        clerkId:id,
        updateData:{
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            imgUrl: image_url,
        }
    })
    return NextResponse.json({message: "OK",user:updatedUser})

  }else if(eventType === 'user.deleted') {
    const {id} = evt.data
     if(id) {
        await deleteUser(id);
     }
    return NextResponse.json({message: "OK"})
  }


  return new Response('', { status: 200 })
}