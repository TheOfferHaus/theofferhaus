import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import CountdownTimer from "@/components/CountdownTimer";
import Image from "next/image";

const prisma = new PrismaClient();

/** Component for offer detail, includes offer/property info from typeform fields and links to offer documents*/

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

  if (!offer) redirect(`${currUser.username}/offers`);

  const { typeformId, envelopeId, envelopeURL } = offer;

  return (
    <div className="max-w-screen-lg mx-auto text-center">
      <div className="p-12 md:px-24 mb-12">
        <div className="Address text-center sm:mb-20 mb-6">
          <h1 className="sm:text-3xl text-2xl mb-3 font-extrabold">
            {offer.property.address}
          </h1>
        </div>

        <div className="Map md:mb-24 mb-8 mx-auto relative md:h-[20rem] h-[20rem]">
          <Image
            src="/example-map.jpg"
            alt="PropertyMap"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="grid grid-cols-1 md:gap-12 md:grid-cols-2">
          <div className="DueDates mb-16 md:mb-0 text-center sm:text-xl text:lg">
            <div className="NegotiationDueDate mb-3">
              <span>
                Negotiation Due Date: &nbsp;
                <CountdownTimer targetDate={new Date("5/15/2024")} />
              </span>
            </div>
            <div className="AppraisalDueDate mb-3">
              <span>
                Appraisal Due Date: &nbsp;
                <CountdownTimer targetDate={new Date("5/16/2024")} />
              </span>
            </div>
            <div className="InspectionDueDate mb-3">
              <span>
                Inspection Due Date: &nbsp;
                <CountdownTimer targetDate={new Date("5/17/2024")} />
              </span>
            </div>
          </div>
          <div className="OfferInfo text-center sm:text-xl text-lg">
            <h2 className="mb-3">Current Offer Amount: {`$${offer.price}`}</h2>
            <div className="ClosingDueDate mb-3">
              <span>
                Closing Date: &nbsp;
                <CountdownTimer targetDate={new Date("5/14/2024")} />
              </span>
              <h2 className="mb-3">Down Payment: {`$150000`}</h2>
              <h2 className="mb-3">Earnest Money: {`$50000`}</h2>
            </div>
          </div>
        </div>

        <div className="flex justify-center my-12">
          <button
            className="mt-5 px-10 py-6 text-xl bg-custom-white text-black font-semibold rounded-lg shadow-md
              hover:bg-black hover:text-white focus:outline-none focus:ring-2
              focus:ring-light-gray focus:ring-opacity-75 animation: : transition
              duration-150 ease-in-out transform hover:scale-95"
          >
            Generate Documents
          </button>
        </div>
      </div>
    </div>
  );
}
