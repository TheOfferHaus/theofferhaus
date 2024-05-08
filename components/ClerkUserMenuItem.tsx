import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

/**
 * Component for Clerk User to be used in NavBar.
 */

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

export default ClerkUserMenuItem;
