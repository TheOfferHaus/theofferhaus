import Image from "next/image";

/** Header component for landing page */

const ContactHeader = () => {
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
          Contact
        </h1>
      </div>
    </div>
  );
};

export default ContactHeader;