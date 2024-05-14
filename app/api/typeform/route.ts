
import OregonFormDataExtractor from "@/lib/docusign/FormDataExtractors/OregonFormDataExtractor";
import { makeEnvelope } from "@/lib/docusign/serverActions";
import { updateOfferOnFormSubmission, setOfferFormInProgressFalse } from "./databaseHelpers";

/**
 * Webhook endpoint for receiving data from Typeform.
 */

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { username, property_id, offer_id, email, full_name } = formData.form_response.hidden;

    const formattedData =
      OregonFormDataExtractor.getFormattedFormDataForDocusign(
        formData.form_response.answers
      );

    const signerData = {
      email,
      name: full_name,
      userId: username,
    };

    const envelopeId = await makeEnvelope(formattedData, signerData);

    await updateOfferOnFormSubmission(offer_id, envelopeId, formData.event_id, property_id);
    await setOfferFormInProgressFalse(username);

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
