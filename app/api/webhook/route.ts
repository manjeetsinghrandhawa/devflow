import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, updateUser, deleteUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  //   const { id } = evt.data;
  const eventType = evt.type;

  // Handle to event
  if (eventType === "user.created") {
    // get user data
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    const mongoUser = await createUser({
      clerkId: id,
      name: `${first_name} ${last_name ? ` ${last_name}` : ""}`,
      username: username!,
      email: email_addresses[0].email_address,
      picture: image_url,
    });

    return NextResponse.json({ messsage: "OK", user: mongoUser });
  }
  if (eventType === "user.updated") {
    // get user data
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    console.log("clerk id", id);

    // create a server action to create a user in the database

    const mongoUser = await updateUser({
      clerkId: id,
      updateData: {
        name: `${first_name} ${last_name ? ` ${last_name}` : ""}`,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url,
      },
      path: `/profile/${id}`,
    });

    return NextResponse.json({ messsage: "OK", user: mongoUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    const deletedUser = await deleteUser({ clerkId: id! });

    return NextResponse.json({ messsage: "OK", user: deletedUser });
  }

  return NextResponse.json({ messsage: "OK" });
}
