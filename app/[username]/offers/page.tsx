import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/** List of all the offer documents user has generated with our platform */

export default async function Offers({ params } : {params: {username: string}}) {

    const  { username } = params;

    const currUser = await currentUser();
    if (username !== currUser!.username) redirect(`/${currUser!.username}/offers`);
    console.log(currUser);

    /**
     *
     *
     * when offer is made an evelope id is generated
     * offer and envelope id is put into the database
     *
     * when getting to this page we:
     * query for user's offers
     * use envelope id from each offer to fetch from docusign API for link to specific envelope
     * map over links from API call to make li
     *
     * offer id: #12
     *
     * link leads to docusign ---> sign-in
     *
     *
     *
    */




    return (
        <h1>Hello {username}</h1>
    );
}