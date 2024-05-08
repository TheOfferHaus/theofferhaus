"use client";

import { useUser } from "@clerk/clerk-react";
import { createTemplate, getEnvelopeUrl, makeEnvelope, sendEnvelopeEmail, generateAccessDataAfterConsent } from "@/lib/docusign/serverActions";
import RESIDENTIAL_PURCHASE_AGREEMENT_DUMMY_DATA from "@/lib/docusign/agreementDummyData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import { useSearchParams } from "next/navigation";

const DOCUSIGN_CODE_URL = `https://account-d.docusign.com/password?response_type=code&scope=signature%20impersonation&client_id=${process.env.NEXT_PUBLIC_DOCUSIGN_INTEGRATION_KEY}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fadmin%2Fdocusign`;

export default function DocusignPage() {
    const params = useSearchParams();
    const [documentUrl, setDocumentUrl] = useState("");
    const [templateId, setTemplateId] = useState("");
    const { user } = useUser();

    useEffect(function createTokenOnMount() {
        async function createToken() {
            generateAccessDataAfterConsent(params.get('code')!);
        }

        if (params.get('code')) {
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

    async function handleGetEnvelopes(evt: FormEvent) {
        evt.preventDefault();
        const signerData = {
            name: `${user?.firstName} ${user?.lastName}`,
            email: user?.emailAddresses[0].emailAddress!
        };
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
                <button onClick={handleGetEnvelopes}>Get Envelopes</button>
            </div>
            <div>
                <a href={DOCUSIGN_CODE_URL}>Get token</a>
            </div>
            <div>
                {documentUrl && <Link href={documentUrl}>Sign document</Link>}
            </div>
            <div>
                {templateId}
            </div>
            <div>
                {user?.emailAddresses[0].emailAddress!}
            </div>
        </div>
    );
}

