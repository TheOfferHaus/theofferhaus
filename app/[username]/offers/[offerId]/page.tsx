import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import CountdownTimer from "@/components/CountdownTimer";
import { TYPEFORM_API_BASE_URL, TYPEFORM_OFFER_FORM_ID } from "@/constants";
import { getFormattedOfferDetails, getSignerData } from "./offerDetailHelpers";
import { getEnvelopeUrl } from "@/lib/docusign/serverActions";
import Link from "next/link";

import Image from "next/image";

const prisma = new PrismaClient();

// TODO: Negotiation Due Date and Appraisal Due Date will need to be incorporated
//       after the required Typeform question changes/additions are made

/** Component for offer detail page, includes offer/property info from typeform
 * fields and links to offer documents*/

export default async function Offer({
  params,
}: {
  params: { offerId: string };
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
    <div className="mx-auto text-center">
      <div className="p-12 md:px-24 mb-12">
        <div className="Address text-center md:mb-20 mb-12">
          <h1 className="md:text-5xl sm:text-4xl text-3xl">
            {offer.property.address}
          </h1>
        </div>

        <div className="Map md:mb-24 mb-12 mx-auto relative md:h-[20rem] h-[20rem]">
          <Image
            src="/example-map.jpg"
            alt="PropertyMap"
            fill={true}
            style={{ objectFit: "contain" }}
            priority={true}
          />
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:gap-12 md:grid-cols-2 sm:text-md text-sm">
            <div className="DueDates mb-12 md:mb-0 text-left">
              <h3 className="NegotiationDueDate mb-4">
                <span className="sm:text-2xl text-xl">
                  Negotiation Due Date:
                </span>
                &nbsp;
                <span className="italic">
                  {/* <CountdownTimer targetDate={new Date("5/15/2024")} /> */}
                  TO BE IMPLEMENTED
                </span>
              </h3>
              <h3 className="AppraisalDueDate mb-4">
                <span className="sm:text-2xl text-xl">Appraisal Due Date:</span>{" "}
                &nbsp;
                <span className="italic">
                  {/* <CountdownTimer targetDate={new Date("5/16/2024")} /> */}
                  TO BE IMPLEMENTED
                </span>
              </h3>
              <h3 className="InspectionDueDate">
                <span className="sm:text-2xl text-xl">
                  Inspection Due Date:
                </span>{" "}
                &nbsp;
                <span className="italic">
                  <CountdownTimer
                    targetDate={
                      formattedOfferDetails["inspection_date"] as Date
                    }
                  />
                </span>
              </h3>
            </div>
            <div className="OfferInfo text-left md:mx-auto mx-0">
              <h3 className="mb-4">
                <span className="sm:text-2xl text-xl">
                  Current Offer Amount:
                </span>{" "}
                &nbsp;
                <span className="italic">{`$${formattedOfferDetails[
                  "offer_amount_num"
                ].toLocaleString()}`}</span>
              </h3>
              <h3 className="ClosingDueDate mb-4">
                <span className="sm:text-2xl text-xl">Closing Date:</span>{" "}
                &nbsp;
                <span className="italic">
                  <CountdownTimer
                    targetDate={
                      formattedOfferDetails["closing_time_deadline"] as Date
                    }
                  />
                </span>
              </h3>
              <h3 className="mb-4">
                <span className="sm:text-2xl text-xl">Down Payment:</span>{" "}
                &nbsp;
                <span className="italic">{`$${formattedOfferDetails[
                  "down_payment_amount_num"
                ].toLocaleString()}`}</span>
              </h3>
              <h3>
                <span className="sm:text-2xl text-xl">Earnest Money:</span>{" "}
                &nbsp;
                <span className="italic">
                  {formattedOfferDetails["earnest_money"] ? "Yes" : "N/A"}
                </span>
              </h3>
            </div>
          </div>
        </div>

        <div className="flex justify-center my-12">
          <button
            className="md:mt-5 px-10 py-6 text-xl bg-custom-white text-black font-semibold rounded-lg shadow-md
              hover:bg-black hover:text-white focus:outline-none
              focus:ring-light-gray focus:ring-opacity-75 animation: : transition
              duration-150 ease-in-out transform hover:scale-95"
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
