import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import OfferCard from "@/components/OfferCard";

const prisma = new PrismaClient();


/** Lists all the offer documents user has generated with our platform. Includes
 * offer ID and link to corresponding Docusign envelope
 *
 * Ensures that users can only access their own offers
 */

export default async function Offers({ params }: { params: { username: string; }; }) {
    const { username } = params;
    const currUser = await currentUser();

    if (username !== currUser!.username) redirect(`/${currUser!.username}/offers`);

    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
        include: {
            offers: {
                include: {
                    property: true
                },
                orderBy: {
                    id: 'asc',
                }
            }
        }
    });


    // TODO: this array will be passed into a function (from docusign team) that gives us back an array of
    // objects with each object having the envelopeId and the corresponding link
    // to the docusign envelop
    const offerIds = user?.offers.map(o => ({
        id: o.id,
        envelopeId: o.envelopeId,
    }));

    // TODO: when docusign team completes docusign class, this would ideally come from their
    // method, in this exact shape.
    const testOffers = [{ id: 2, envelopeId: "testgoogleid", docusignLink: "https://www.google.com" },
    {id: 3, envelopeId: "testyoutubeid", docusignLink: "https://www.youtube.com"}];


    return (
        <div>
            {testOffers.map(o => <OfferCard key={o.id} offer={o} />)}
        </div>
    )
}