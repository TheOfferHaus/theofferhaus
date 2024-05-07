import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

const ClerkUserMenuItem = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

/** NavBar component */

const NavBar = () => {
  return (
    <nav className="absolute w-full bg-custom-white text-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="hidden items-center md:ml-6 md:flex md:space-x-8 ">
              {/* Navigation links */}
              <Link
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                href="/"
              >
                Home
              </Link>
              <Link
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                href="/quiz"
              >
                Quiz
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClerkUserMenuItem />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
