import {Webhook} from 'svix'
import {headers} from 'next/headers'
import {WebhookEvent} from '@clerk/nextjs/server'
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET


    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
    }

    const wh = new Webhook(SIGNING_SECRET)

    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        })
    }

    const {id} = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', body)


    if (eventType === "user.created") {
        try {
            await prisma.user.create({
                data: {
                    id: evt.data.id,
                    username: JSON.parse(body).data.username ?? "anonymous",
                    email: JSON.parse(body).data.email_addresses[0].email_address,
                    avatar: JSON.parse(body).data.profile_image_url,
                }
            })

        } catch (error) {
            console.log(error)
            return new Response("Error : Failed to create a user!", {
                status: 500,

            })
        }
    }

    if (eventType === "user.updated") {
        try {
            await prisma.user.update({
                where: {
                    id: evt.data.id,
                },
                data: {
                    username: JSON.parse(body).data.username,
                    email: JSON.parse(body).data.email_addresses[0].email_address,
                    avatar: JSON.parse(body).data.profile_image_url,
                }
            })

        } catch (error) {
            console.log(error)
            return new Response("Error : Failed to update a user!", {
                status: 500,

            })
        }
    }

    if (eventType === "user.deleted") {

        if (!evt.data.id) return;

        try {
            await prisma.user.delete({
                where: {
                    id: evt.data.id,
                }
            })

        } catch (error) {
            console.log(error)
            return new Response("Error : Failed to delete a user!", {
                status: 500,

            })
        }
    }


    return new Response('Webhook received', {status: 200})
}