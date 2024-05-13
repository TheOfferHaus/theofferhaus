import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import CommissionTicker from "./CommissionTicker";

/** Header component for landing page */

const Header = () => {
  return (
    <div className="relative h-[38rem] w-screen">
      <div className="h-full">
        <Image
          src="/panorama-house.jpg"
          alt="House background"
          fill={true}
          style={{ objectFit: "cover", objectPosition: "bottom" }}
          quality={100}
          priority={true}
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center bottom-8">
        <h1 className="lg:text-9xl md:text-8xl sm:text-8xl text-6xl text-custom-white mb-8">
          The Offer Haus
        </h1>

        <h3 className="sm:text-2xl text-xl text-custom-white mb-8">
          Take control of buying your house.
          <br />
          Write a winning offer in under 10 minutes.
        </h3>

        <button className="bg-custom-white text-primary-medium rounded-lg text-2xl shadow-md px-12 py-6 transition duration-150 ease-in-out transform hover:scale-95 ">
          <Link href="/quiz">Get Started</Link>
        </button>
        <Card>
          <CardContent>
            <CommissionTicker incrementAmount={1519.42} />
          </CardContent>
          <CardFooter>
            * The median home value in the United States in 2023 was around $340,000
            <br/>
            Average commission rate: 5.49%
            <br />
            Total commission per home: $340,000 x 0.0549 = $18,646
            <br />
            Total number of home sales: 5,140,000
            <br />
            Estimated total real estate commission paid to Realtors in the U.S. in 2023: $18,646 x 5,140,000 = $95,833,440,000
            <br />
            Total real estate commissions divided by 2 is the Buyers Commission: $47,916,720,000
            <br />
            Over a year the Buyers Commission paid per day: $131,278,684.93
            <br />
            $1,519.42 per second.
            </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Header;
