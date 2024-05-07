"use client";

import { useUser } from "@clerk/clerk-react";
import { createTemplate, getEnvelopeUrls, getEnvelopeUrl, makeEnvelope, sendEnvelopeEmail } from "@/lib/docusign/serverActions";
import RESIDENTIAL_PURCHASE_AGREEMENT_DUMMY_DATA from "@/lib/docusign/agreementDummyData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import { useParams, useSearchParams } from "next/navigation";

const DOCUSIGN_CODE_URL = `https://account-d.docusign.com/password?response_type=code&scope=signature%20impersonation&client_id=${process.env.NEXT_PUBLIC_DOCUSIGN_INTEGRATION_KEY}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdocusign`;

export default function DocusignPage() {
    const params = useSearchParams()
    const [documentUrl, setDocumentUrl] = useState("");
    const [templateId, setTemplateId] = useState("");
    const [accessData, setAccessData] = useState({});
    const { user } = useUser();

    useEffect(function createTokenOnMount() {
        console.log('in createTokenOnMount');
        console.log('params', params);

        async function createToken() {
            const resp = await fetch('http://localhost:3000/api/docusign',
                {
                    method: 'POST',
                    body: JSON.stringify({code: params.get('code')})
                }
            );

            setAccessData(await resp.json());
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
        console.log("Created envelope");
        console.log("Envelope Id: ", envelopeId);
        await sendEnvelopeEmail(envelopeId);
        console.log("Sent evelope signing email");
        const envelopeUrl = await getEnvelopeUrl(envelopeId, signerData);
        console.log(envelopeUrl);
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

        console.log(await getEnvelopeUrls([{ id: '1', envelopeId: '7ea3a636-a291-41ee-91fd-98f1c613c16f' }], signerData));
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

