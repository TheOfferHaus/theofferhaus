import Image from "next/image";
import Link from "next/link";

/** Header component for landing page */

const FaqHeader = () => {
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
          The Offer Haus FAQs
        </h1>

        <button className="bg-custom-white text-primary-medium rounded-lg text-2xl shadow-md px-12 py-6 transition duration-150 ease-in-out transform hover:scale-95 ">
          <Link href="/quiz">Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default FaqHeader;