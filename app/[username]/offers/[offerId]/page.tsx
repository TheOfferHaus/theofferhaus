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
    <div className="grid grid-cols-2 pt-12">
      <div className="MapAndDueDates text-center text-xl font-extrabold">
        <div className="Map mb-20">
          <Image
            className="h-auto w-2/4 mx-auto"
            src="/example-map.jpg"
            alt="PropertyMap"
          />
        </div>
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
      <div className="AddressAndOfferInfo text-center">
        <div className="Address mt-0">
          <h1 className="lg:text-3xl md:text-3xl sm:text-3xl text-2xl mb-3 mt-4 font-bold">
            {offer.property.address}
          </h1>
          <div className="text-xl font-extrabold">
            <h2 className="mb-3">Current Offer Amount: {`$${offer.price}`}</h2>
            <div className="ClosingDueDate mb-3">
              <span>
                Closing Date: &nbsp;
                <CountdownTimer targetDate={new Date("5/14/2024")} />
              </span>
            </div>
            <h2 className="mb-3">Down Payment: {`$150000`}</h2>
            <h2 className="mb-3">Earnest Money: {`$50000`}</h2>
          </div>
          <button
            className="mt-5 px-4 py-2 bg-custom-white text-black font-semibold rounded-lg shadow-md
              hover:bg-black hover:text-white focus:outline-none focus:ring-2
              focus:ring-light-gray focus:ring-opacity-75 transition duration-300
              ease-in-out transform hover:-translate-y-1 hover:scale-10"
          >
            Generate Documents
          </button>
        </div>
      </div>
    </div>
  );
}
