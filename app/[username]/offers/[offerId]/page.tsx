import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import CountdownTimer from "@/components/CountdownTimer";

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

  const { typeformId, envelopeId } = offer;

  // const typeformData = fetch(typeformAPI) get responses

  const currentDate = new Date();

  return (
    <div>
      <div className="Address">
        <h1 className="lg:text-5xl md:text-3xl sm:text-3xl text-2xl mb-3 mt-4">
          Property Address: {offer.property.address}
        </h1>
      </div>
      <div className="ClosingDueDate">
        <h5>Closing Date: </h5>
        <CountdownTimer targetDate={new Date("5/14/2024")} />
      </div>
      <div className="NegotiationDueDate">
        <h5>Negotiation Due Date: </h5>
        <CountdownTimer targetDate={new Date("5/15/2024")} />
      </div>
      <div className="AppraisalDueDate">
        <h5>Appraisal Due Date: </h5>
        <CountdownTimer targetDate={new Date("5/16/2024")} />
      </div>
      <div className="InspectionDueDate">
        <h5>Inspection Due Date: </h5>
        <CountdownTimer targetDate={new Date("5/17/2024")} />
      </div>
    </div>
  );
}
