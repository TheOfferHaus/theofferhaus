"use client";

import { useUser } from "@clerk/clerk-react";
import { generateAccessDataAfterConsent } from "@/lib/docusign/serverActions";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const DOCUSIGN_CODE_URL = `https://account-d.docusign.com/password?response_type=code&scope=signature%20impersonation&client_id=${process.env.NEXT_PUBLIC_DOCUSIGN_INTEGRATION_KEY}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdocusign`;

export default function DocusignPage() {
  const params = useSearchParams();
  const { user } = useUser();

  useEffect(function createTokenOnMount() {
    async function createToken() {
      generateAccessDataAfterConsent(params.get("code")!);
    }

    if (params.get("code")) {
      createToken();
    }
  }, []);

  if (!user) return <h1>Loading</h1>;

  return (
    <section className="flex flex-col items-center min-h-screen mx-auto">
      <a href={DOCUSIGN_CODE_URL}>Get token</a>
    </section>
  );
}
