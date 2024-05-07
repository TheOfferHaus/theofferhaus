import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

/** Body component for landing page */

const Body = () => {
  return (
    <div>
      {/* Body Banner with description of pricing options section */}
      <div className="relative w-screen mx-auto px-4 sm:px-6 lg:px-8 bg-custom-white py-6 rounded-3xl -mt-6 z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl leading-tight">
            The simplest way to buy Real Estate.
            <br />
            You take control of your transaction.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="flex justify-center items-center mb-2">
              <span className="mr-2 text-primary-medium">✔</span>
              <span>One platform for the entire process.</span>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center mb-2">
              <span className="mr-2 text-primary-medium">✔</span>
              <span>Simple price. You won't find any HUGE fees.</span>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center mb-2">
              <span className="mr-2 text-primary-medium">✔</span>
              <span>Full transaction, start to finish.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards below for pricing options */}
      <div className="grid grid-cols-2 gap-14 p-32 bg-off-white">
        <Card>
          <CardHeader>
            <CardTitle>Get started today.</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>
                -Simplified offer system to allow you to write an offer in 10
                minutes.
              </li>
              <li>-Full control of your offer.</li>
              <li>-Legally created offer for your state.</li>
              <li>
                -Unlimited offers for 30 days or until a successfully accepted
                offer.
              </li>
              <li>
                -Ability to upgrade to <b>Full Platform</b> if you choose for an
                additional $399.00
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="#">
              <button className="bg-primary-dark text-off-white rounded-lg p-4 shadow-md">
                $99.00 For Offer Package
              </button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Everything you need from offer to keys-in-hand.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>
                -Everything from the <b>Offer Package</b>.
              </li>
              <li>
                -Full walk-through of all documents along with explanations to
                make the purchase as stress-free as possible.
              </li>
              <li>-All document needs for a Real Estate purchase.</li>
              <li>
                -3 months of unlimited offers or until you have a successful
                closing!
              </li>
              <li>
                -Single platform for all documents, counters, and communications
                with the seller.
              </li>
              <li>
                -Docusign documents - the leader for Real Estate documents.
              </li>
              <li>
                -Alert system to keep your transaction on track for a successful
                close.
              </li>
              <li>-Full control of your Real Estate purchase!</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="#">
              <button className="bg-primary-dark text-off-white rounded-lg p-4 shadow-md">
                $499.00 Full Platform Package
              </button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Body;
