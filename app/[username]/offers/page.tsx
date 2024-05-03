import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

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

    const offerIds = user?.offers.map(o => ({
        id: o.id,
        envelopeId: o.envelopeId,
    }));

    // this array will be passed into a function that gives us back an array of
    // objects with each object having the envelopeId and the corresponding link
    // to the docusign envelope


    const offers = [{ id: "id", envelopeId: "string", docusignLink: "link" }, {}];


    // return statement would map through the offers array that now contains
    // both offerId AND a link to the envelope, and would render a Offer display
    // component for each one

    return (
        <div>
            {offers.map(o => <OfferCard key={o.id} offer={o} />)}
        </div>
    )


    return (
        <h1>Hello {username}</h1>
    );
}