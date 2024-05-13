import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Webhook endpoint for receiving data from Typeform.
 */

import OregonFormDataExtractor from "@/lib/docusign/FormDataExtractors/OregonFormDataExtractor";
import { makeEnvelope } from "@/lib/docusign/serverActions";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { username, property_id, offer_id } = formData.form_response.hidden;

    const formattedData = OregonFormDataExtractor.getFormattedFormDataForDocusign(formData.form_response.answers);
    const envelopeId = await makeEnvelope(formattedData, { email: formattedData.buyer_email, name: formattedData.buyers_name, userId: username });

    await prisma.offer.update({
      where: {
        id: 'ef555a14-cebe-48b8-a813-9f777ca38572'
      },
      data: {
        envelopeId,
        typeformId: formData.event_id,
        propertyId: "0fddb1e9-66af-409a-89e5-0350b76e6da5"
      }
    });

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
