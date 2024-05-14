import { User, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect, useSearchParams } from "next/navigation";
import OfferCard from "@/components/OfferCard";
import Link from "next/link";

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
}: {
  params: { username: string };
}) {
  const { username } = params;
  const currUser = (await currentUser()) as User;

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
    <div className="text-center">
      <h1 className="lg:text-5xl md:text-8xl sm:text-8xl text-6xl mb-3 mt-4">
        My Offers
      </h1>
      {offers.length === 0 && <h3>You have no offers!</h3>}
      <div className="grid grid-cols-3 place-items-center">
        {offers.map((o) => (
          <OfferCard key={o.id} offer={o} />
        ))}
      </div>
      {!user.offerFormInProgress && (
        <button
          className="mt-5 px-4 py-2 bg-custom-white text-black font-semibold rounded-lg shadow-md
              hover:bg-black hover:text-white focus:outline-none focus:ring-2
              focus:ring-light-gray focus:ring-opacity-75 transition duration-300
              ease-in-out transform hover:-translate-y-1 hover:scale-10"
        >
          <Link href="/address-validate" target="_blank">
            <p className="hover:text-gray-300">Make new offer</p>
          </Link>
        </button>
      )}
    </div>
  );
}
