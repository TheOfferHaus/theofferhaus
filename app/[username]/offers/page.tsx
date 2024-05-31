import { User, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import OfferCard from "@/components/OfferCard";
import Link from "next/link";
import ToastAlertMessage from "@/components/ToastAlertMessage";

const prisma = new PrismaClient();

/**
 * Lists all the offer documents user has generated with our platform. Includes
 * offer ID and what property the offer was made for
 *
 * Ensures that users can only access their own offers
 *
 * Offers -> OfferCard
 */

export default async function Offers({
  params,
  searchParams,
}: {
  params: { username: string; };
  searchParams: {
    validateRedirect: string;
    from: string;
  };
}) {
  const { username } = params;
  const currUser = (await currentUser()) as User;

  const cameFromTypeform = (searchParams.from === "typeform");

  if (username !== currUser.username) redirect(`/${currUser.username}/offers`);

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      offers: {
        include: {
          property: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) throw new Error("Failed to get user from database");

  const offers = user.offers;

  return (
    <div className="text-center mb-12">
      {searchParams.validateRedirect === "true" && (
        <ToastAlertMessage
          message={"You currently have an application in progress!"}
        />
      )}
      <h1 className="lg:text-5xl md:text-8xl sm:text-8xl text-6xl mb-3 mt-6">
        My Offers
      </h1>
      {offers.length === 0 && <h3>You have no offers!</h3>}
      <div className="grid grid-cols-3 place-items-center">
        {offers.map((o) => (
          <OfferCard key={o.id} offer={o} knowCompleted={cameFromTypeform} />
        ))}
      </div>
      {!user.offerFormInProgress && (
        <button
          className="mt-5 mb-20 px-6 py-4 bg-custom-white text-black font-semibold rounded-lg shadow-md
              hover:bg-black hover:text-white focus:outline-none focus:ring-2
              focus:ring-light-gray focus:ring-opacity-75 animation: : transition
              duration-150 ease-in-out transform hover:scale-95"
        >
          <Link href="/address-validate" target="_blank">
            <p className="hover:text-gray-300 text-xl">Make New Offer</p>
          </Link>
        </button>
      )}
    </div>
  );
}
