import Image from "next/image";
import Link from "next/link";

/** Header component for landing page */

const FaqHeader = () => {
  return (
    <div className="relative h-[24rem] w-screen">
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
          FAQs
        </h1>
      </div>
    </div>
  );
};

export default FaqHeader;