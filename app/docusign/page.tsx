"use client";

import { useUser } from "@clerk/clerk-react";
import { createTemplate, getEnvelopeUrls, getEnvelopeUrl, makeEnvelope, sendEnvelopeEmail } from "@/lib/docusign/serverActions";
import RESIDENTIAL_PURCHASE_AGREEMENT_DUMMY_DATA from "@/lib/docusign/agreementDummyData";
import Link from "next/link";
import { useState } from "react";
import { FormEvent } from "react";

export default function DocusignPage() {

    const [documentUrl, setDocumentUrl] = useState("");
    const [templateId, setTemplateId] = useState("");
    const { user } = useUser();

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

