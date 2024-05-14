import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import CommissionTicker from "./CommissionTicker";

/** Body component for landing page */

const Body = () => {
  return (
    <div>
      <div className="relative w-screen mx-auto px-4 sm:px-6 lg:px-8 bg-custom-white py-6 rounded-3xl -mt-6 z-10 rounded-b-none">
        <div className="text-center mb-10">
          <h2 className="text-2xl leading-tight">
            The simplest way to buy Real Estate.
            <br />
            You take control of your transaction.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-lg">
          <div>
            <div className="flex justify-center items-center mb-2">
              <span className="mr-2 text-primary-dark">✔</span>
              <span>One platform for the entire process.</span>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center mb-2">
              <span className="mr-2 text-primary-dark">✔</span>
              <span>Simple price. You won't find any HUGE fees.</span>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center mb-2">
              <span className="mr-2 text-primary-dark">✔</span>
              <span>Full transaction, start to finish.</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Card className="bg-primary-medium shadow-xl pb-2 flex justify-center rounded-t-none rounded-b-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <CardContent className="pt-2 text-4xl text-custom-white font-bold text-center -mb-6 md:ml-32 ml-0 2xl:text-5xl">
              <CommissionTicker incrementAmount={1519.42} />
            </CardContent>
            <CardDescription className="text-sm px-2 pb-2 pt-2 text-custom-white text-center md:mr-32 mr-0 md:text-lg md:px-0 max-w-2xl">
              *In the U.S. with a median home value of $340,000&nbsp;and an
              average commission rate of 5.49%, buyers are&nbsp;paying
              $47,916,720,000 in fees&nbsp;yearly.
              That's&nbsp;$1,519.42&nbsp;per&nbsp;second&nbsp;in&nbsp;fees!
            </CardDescription>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-14 lg:p-32 md:p-12 p-12 sm:p-20 mb-12 bg-off-white">
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
              <button className="bg-primary-medium text-custom-white transition duration-150 ease-in-out transform hover:scale-95 rounded-lg p-4 shadow-md">
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
              <button className="bg-primary-medium text-custom-white transition duration-150 ease-in-out transform hover:scale-95 rounded-lg p-4 shadow-md">
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
