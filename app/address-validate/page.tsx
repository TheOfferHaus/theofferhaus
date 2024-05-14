import AddressValidationForm from "@/components/AddressValidationForm";
import { User, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function AddressValidate() {
  const currUser = (await currentUser()) as User;

  const username = currUser.username as string;
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) throw new Error("Error fetching user from database");

  if (user.offerFormInProgress)
    redirect(`/${username}/offers?validateRedirect=true`);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto mt-44">
        <p className="text-3xl font-bold">
          Please input the address for the property you are making an offer to
        </p>
        <br />
      <AddressValidationForm />
    </div>
  );
}
