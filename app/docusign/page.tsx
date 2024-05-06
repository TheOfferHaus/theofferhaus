"use client";

import { useUser } from "@clerk/clerk-react";
import { makeAndSendEnvelope, createTemplate } from "@/lib/docusign/serverActions";
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

        const signingUrl = await makeAndSendEnvelope(RESIDENTIAL_PURCHASE_AGREEMENT_DUMMY_DATA, signerData);
        setDocumentUrl(signingUrl);
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

