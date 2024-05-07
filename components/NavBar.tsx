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
    <nav className="absolute w-full bg-custom-white z-50">
      <div className="flex px-4 sm:px-6 lg:px-8 justify-between h-16 mx-auto">
            {/* Navigation links */}
            <div className="flex items-center space-x-8">
              <Link
                className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary-dark"
                href="/"
              >
                Home
              </Link>
              <Link
                className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary-dark"
                href="/quiz"
              >
                Quiz
              </Link>
          </div>
          {/* Clerk Sign-in */}
          <div className="flex items-center">
              <ClerkUserMenuItem />
          </div>
      </div>
    </nav>
  );
};

export default NavBar;
