/**
 * Webhook endpoint for receiving data from Typeform.
 */

import OregonFormDataExtractor from "@/lib/docusign/FormDataExtractors/OregonFormDataExtractor";
import RESIDENTIAL_PURCHASE_AGREEMENT_DUMMY_DATA from "@/lib/docusign/agreementDummyData";
import { makeEnvelope } from "@/lib/docusign/serverActions";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const formattedData = OregonFormDataExtractor.getFormattedFormDataForDocusign(formData.form_response.answers);

    const envelopeId = await makeEnvelope(RESIDENTIAL_PURCHASE_AGREEMENT_DUMMY_DATA, {email: 'ani.nishioka@gmail.com', name: 'Anissa Nishioka'});

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
