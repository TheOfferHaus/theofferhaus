/**
 * Webhook endpoint for receiving data from Typeform.
 */

export async function POST(request: Request) {
  try {
    const text = await request.text();
    console.log("Received webhook data:", text);

    return new Response("Webhook processed successfully!", {
      status: 200,
    });
  } catch (error: any) {
    console.log("Error in webhook:", error.message);

    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}
