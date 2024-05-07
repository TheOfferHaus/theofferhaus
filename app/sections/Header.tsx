import Image from "next/image";
import Link from "next/link";

/** Header component for landing page */

const Header = () => {
  return (
    <div>
      {/* Background image */}
      <Image
        src="/panorama-house.jpeg"
        fill
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        quality={100}
        alt="House background"
        className="z-0"
      />

      <div className="absolute inset-0 justify-start text-center top-72">
        {/* Title */}
        <h1 className="text-8xl text-custom-white mb-8">The Offer Haus</h1>

        {/* Description */}
        <h3 className="text-xl text-custom-white mb-8">
          Take control of buying your house.
          <br />
          Write a winning offer in under 10 minutes.
        </h3>

        {/* Button */}
        <button className="bg-custom-white text-primary-dark rounded-lg text-2xl shadow-md px-12 py-6 hover:bg-primary-dark hover:text-custom-white">
          <Link href="/quiz">Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
