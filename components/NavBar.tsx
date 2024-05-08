import Link from "next/link";
import ClerkUserMenuItem from "./ClerkUserMenuItem";

/** NavBar component */

const NavBar = () => {
  return (
    <nav className="w-full bg-custom-white">
      <div className="flex px-4 sm:px-6 lg:px-8 justify-between h-16 mx-auto">
        <div className="flex items-center space-x-8 font-semibold">
          <Link className="px-3 py-2 hover:text-primary-dark" href="/">
            Home
          </Link>
          <Link className="px-3 py-2 hover:text-primary-dark" href="/address-validate">
            Make an Offer
          </Link>
        </div>
        <div className="flex items-center">
          <ClerkUserMenuItem />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
