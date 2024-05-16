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
                  <CountdownTimer targetDate={new Date("5/15/2024")} />
                </span>
              </h3>
              <h3 className="AppraisalDueDate mb-4">
                <span className="sm:text-2xl text-xl">Appraisal Due Date:</span>{" "}
                &nbsp;
                <span className="italic">
                  <CountdownTimer targetDate={new Date("5/16/2024")} />
                </span>
              </h3>
              <h3 className="InspectionDueDate">
                <span className="sm:text-2xl text-xl">
                  Inspection Due Date:
                </span>{" "}
                &nbsp;
                <span className="italic">
                  <CountdownTimer targetDate={new Date("5/17/2024")} />
                </span>
              </h3>
            </div>
            <div className="OfferInfo text-left md:mx-auto mx-0">
              <h3 className="mb-4">
                <span className="sm:text-2xl text-xl">
                  Current Offer Amount:
                </span>{" "}
                &nbsp;
                <span className="italic">{`$${offer.price}`}</span>
              </h3>
              <h3 className="ClosingDueDate mb-4">
                <span className="sm:text-2xl text-xl">Closing Date:</span>{" "}
                &nbsp;
                <span className="italic">
                  <CountdownTimer targetDate={new Date("5/14/2024")} />
                </span>
              </h3>
              <h3 className="mb-4">
                <span className="sm:text-2xl text-xl">Down Payment:</span>{" "}
                &nbsp;
                <span className="italic">{`$150000`}</span>
              </h3>
              <h3>
                <span className="sm:text-2xl text-xl">Earnest Money:</span>{" "}
                &nbsp;
                <span className="italic">{`$50000`}</span>
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
            Generate Documents
          </button>
        </div>
      </div>
    </div>
  );
}
