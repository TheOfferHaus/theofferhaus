/**
 * Webhook endpoint for receiving data from Typeform.
 */

import FormDataExtractor from "@/lib/docusign/FormDataExtractors/FormDataExtractor";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    console.log("Received webhook data:", formData);

    const formattedData = FormDataExtractor.getFormattedFormDataForDocusign(formData);

    console.log('Formatted data: ', formData);

    return new Response("Webhook processed successfully!", {
      status: 200,
    });
  } catch (error: any) {
    console.log("Error in webhook:", error.message);

    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  //const newEnvelope = await makeEnvelope(formatFormDataForDocusign(formData), signerData, templateId)
}
