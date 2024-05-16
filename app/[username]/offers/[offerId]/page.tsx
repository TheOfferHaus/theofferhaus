import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import CountdownTimer from "@/components/CountdownTimer";
import {
  TYPEFORM_API_BASE_URL,
  TYPEFORM_OFFER_FORM_ID,
} from "@/constants";
import { getFormattedOfferDetails, getSignerData } from "./offerDetailHelpers";
import { getEnvelopeUrl } from "@/lib/docusign/serverActions";
import Link from "next/link";


const prisma = new PrismaClient();

// TODO: Negotiation Due Date and Appraisal Due Date will need to be incorporated
//       after the required Typeform question changes/additions are made

/** Component for offer detail page, includes offer/property info from typeform
 * fields and links to offer documents*/

export default async function Offer({
  params,
}: {
  params: { offerId: string; };
}) {
  const currUser = (await currentUser()) as User;

  const { offerId } = params;

  const offer = await prisma.offer.findUnique({
    where: {
      id: offerId,
    },
    include: {
      property: true,
    },
  });

  // redirect to offer index page if offer cannot be found
  if (!offer) redirect(`${currUser.username}/offers`);

  const { typeformId, envelopeId } = offer;

  const signerData = getSignerData(currUser);
  const envelopeUrl = await getEnvelopeUrl(envelopeId as string, signerData);

  // get the response data from the form submission related to this offer
  const response = await fetch(
    `${TYPEFORM_API_BASE_URL}/forms/${TYPEFORM_OFFER_FORM_ID}/responses?included_response_ids=${typeformId}`,
    {
      headers: {
        authorization: `Bearer ${process.env.TYPEFORM_BEARER_TOKEN}`,
      },
    }
  );

  const formData = await response.json();
  const formattedOfferDetails = getFormattedOfferDetails(formData);

  return (
    <div className="grid grid-cols-2 pt-12">
      <div className="MapAndDueDates text-center text-xl font-extrabold">
        <div className="Map mb-20">
          <img
            className="h-auto w-2/4 mx-auto"
            src="/example-map.jpg"
            alt="PropertyMap"
          />
        </div>
        <div className="NegotiationDueDate mb-4">
          <span>
            Negotiation Due Date: &nbsp;
            {/* <CountdownTimer targetDate={new Date("5/15/2024")} /> */}
            TO BE IMPLEMENTED
          </span>
        </div>
        <div className="AppraisalDueDate mb-4">
          <span>
            Appraisal Due Date: &nbsp;
            {/* <CountdownTimer targetDate={new Date("5/16/2024")} /> */}
            TO BE IMPLEMENTED
          </span>
        </div>
        <div className="InspectionDueDate mb-4">
          <span>
            Inspection Due Date: &nbsp;
            <CountdownTimer
              targetDate={formattedOfferDetails["inspection_date"] as Date}
            />
          </span>
        </div>
      </div>
      <div className="AddressAndOfferInfo text-center">
        <div className="Address mt-0">
          <h1 className="lg:text-3xl md:text-3xl sm:text-3xl text-2xl mb-4 mt-4 font-bold">
            {offer.property.address}
          </h1>
          <div className="text-xl font-extrabold">
            <h2 className="mb-4">
              Current Offer Amount:{" "}
              {`$${formattedOfferDetails["offer_amount_num"].toLocaleString()}`}
            </h2>
            <div className="ClosingDueDate mb-4">
              <span>
                Closing Date: &nbsp;
                <CountdownTimer
                  targetDate={
                    formattedOfferDetails["closing_time_deadline"] as Date
                  }
                />
              </span>
            </div>
            <h2 className="mb-4">
              Down Payment:{" "}
              {`$${formattedOfferDetails["down_payment_amount_num"].toLocaleString()}`}
            </h2>
            <h2 className="mb-4">
              Earnest Money:{" "}
              {formattedOfferDetails["earnest_money"] ? "Yes" : "N/A"}
            </h2>
          </div>
          <button
            className="mt-5 px-4 py-2 bg-custom-white text-black font-semibold rounded-lg shadow-md
              hover:bg-black hover:text-white focus:outline-none focus:ring-2
              focus:ring-light-gray focus:ring-opacity-75 transition duration-300
              ease-in-out transform hover:-translate-y-1 hover:scale-10"
          >
            <Link href={envelopeUrl} target="_blank">
              <p className="hover:text-gray-300">View Documents</p>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
