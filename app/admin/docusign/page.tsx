"use client";

import { useUser } from "@clerk/clerk-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";

import { createTemplate, getEnvelopeUrl, makeEnvelope, sendEnvelopeEmail, generateAccessDataAfterConsent } from "@/lib/docusign/serverActions";
import RESIDENTIAL_PURCHASE_AGREEMENT_DUMMY_DATA from "@/lib/docusign/agreementDummyData";

const DOCUSIGN_CODE_URL = `https://account-d.docusign.com/password?response_type=code&scope=signature%20impersonation&client_id=${process.env.NEXT_PUBLIC_DOCUSIGN_INTEGRATION_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_CONSENT_REDIRECT_URL}`;

export default function DocusignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [documentUrl, setDocumentUrl] = useState("");
  const [templateId, setTemplateId] = useState("");
  const { user } = useUser();

  useEffect(function createTokenOnMount() {
    async function createToken() {
      await generateAccessDataAfterConsent(searchParams.get('code')!);

      // Remove query param (if they refresh with the code param then it
      // will throw an error if the authorization code has expired)
      router.push("http://localhost:3000/admin/docusign");
    }

    if (searchParams.get('code')) {
      createToken();
    }
  }, []);


  async function handleSendEnvelope(evt: FormEvent) {
    evt.preventDefault();

    const signerData = {
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.emailAddresses[0].emailAddress!
    };

    const envelopeId = await makeEnvelope(RESIDENTIAL_PURCHASE_AGREEMENT_DUMMY_DATA, signerData);
    await sendEnvelopeEmail(envelopeId);
    const envelopeUrl = await getEnvelopeUrl(envelopeId, signerData);
    setDocumentUrl(envelopeUrl);
  }


  async function handleCreateTemplate(evt: FormEvent) {
    evt.preventDefault();
    const newTemplateId = await createTemplate();
    setTemplateId(newTemplateId);
  }

  if (!user) return <h1>Loading</h1>;

  return (
    <div>
      <div>
        <button onClick={handleSendEnvelope}>Make and Send Envelope</button>
      </div>
      <div>
        <button onClick={handleCreateTemplate}>Create Template</button>
      </div>
      <div>
        <Link href={DOCUSIGN_CODE_URL}>Get token</Link>
      </div>
      <div>
        {documentUrl && <Link href={documentUrl}>Sign document</Link>}
      </div>
      <div>
        {templateId}
      </div>
    </div>
  );
}

