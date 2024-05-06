import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { User } from "@clerk/nextjs/server";
const prisma = new PrismaClient();

/** Component for offer detail, includes offer/property info from typeform fields and links to offer documents*/

export default async function Offer({ params }: { params: { offerId: number; }; } ) {

    const user = await currentUser() as User;


    const { offerId } = params;
    // query for offer
    const offer = await prisma.offer.findUnique({
        where: {
            id: offerId
        }
    })

    if (!offer) redirect(`${user.username}/offers`)

    const {typeformId, envelopeId} = offer;

    // const typeformData = fetch(typeformAPI)
    // const envelope = fetch(docusignAPI)

    return (
        <h1>Specific offer page. Cannot see this if not logged in!</h1>
    );
}