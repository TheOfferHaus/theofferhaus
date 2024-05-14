import { PrismaClient } from "@prisma/client";
import OregonFormDataExtractor from "@/lib/docusign/FormDataExtractors/OregonFormDataExtractor";
import { makeEnvelope } from "@/lib/docusign/serverActions";

const prisma = new PrismaClient();

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

    await prisma.offer.update({
      where: {
        id: offer_id,
      },
      data: {
        envelopeId,
        typeformId: formData.event_id,
        propertyId: property_id,
      },
    });

    await prisma.user.update({
      where: {
        username,
      },
      data: {
        offerFormInProgress: false,
      },
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

}
