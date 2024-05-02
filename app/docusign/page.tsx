"use client";
import RESIDENTIAL_PURCHASE_AGREEMENT_DUMMY_DATA from "@/lib/docusign/agreementDummyData";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  color: "",
};

export default function DocuSignPage() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [documentUri, setDocumentUri] = useState("");

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setFormData((data) => ({
      ...data,
      [evt.target.name]: evt.target.value,
    }));
  }

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const formattedData = Object.keys(RESIDENTIAL_PURCHASE_AGREEMENT_DUMMY_DATA).map((key: string) => ({
      name: key,
      value: RESIDENTIAL_PURCHASE_AGREEMENT_DUMMY_DATA[key]
    }));
    const resp = await fetch("http://localhost:3000/api/docusign/users", {
      method: "POST",
      body: JSON.stringify(formattedData)
    });
    const data = await resp.json();
    setDocumentUri(data.documentUri);
  }

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="color">Favorite Color</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form> */}
      <>
        <button onClick={handleSubmit}>Submit</button>
        {documentUri && <Link href={documentUri}>Sign document</Link>}
      </>
    </div>
  );
}
