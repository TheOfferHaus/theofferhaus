import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { User } from "@clerk/nextjs/server";
import CountdownTimer from "@/components/CountdownTimer";

const prisma = new PrismaClient();

/** Component for offer detail, includes offer/property info from typeform fields and links to offer documents*/

export default async function Offer({ params }: { params: { offerId: number; }; }) {
    const user = await currentUser() as User;

    const { offerId } = params;

    const offer = await prisma.offer.findUnique({
        where: {
            id: Number(offerId)
        }
    });

    if (!offer) redirect(`${user.username}/offers`);

    const { typeformId, envelopeId } = offer;

    // const typeformData = fetch(typeformAPI)
    // const envelope = fetch(docusignAPI)

    const currentDate = new Date();

    return (
        <div>
            <h1>Specific offer page. Cannot see this if not logged in!</h1>
            <div className="ClosingDueDate">
                <h5>Closing Date: </h5>
                <CountdownTimer targetDate={new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)} />
            </div>
            <div className="NegotiationDueDate">
                <h5>Negotiation Due Date: </h5>
                <CountdownTimer targetDate={new Date(currentDate.getTime() + 1 * 60000)} />
            </div>
            <div className="AppraisalDueDate">
                <h5>Appraisal Due Date: </h5>
                <CountdownTimer targetDate={new Date(currentDate.getTime() + 1 * 60000)} />
            </div>
            <div className="InspectionDueDate">
                <h5>Inspection Due Date: </h5>
                <CountdownTimer targetDate={new Date(currentDate.getTime() + 1 * 60000)} />
            </div>
        </div>
    );
}