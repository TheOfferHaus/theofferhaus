"use client";

import { Widget } from "@typeform/embed-react";
import { TYPEFORM_OFFER_FORM_ID } from "@/constants";

/**Component for rendering a TypeForm widget (embeds the form) */

export default function TypeformWidget({
  username,
  propertyId,
  offerId,
  email,
  fullName
}: {
  username: string;
  propertyId: string;
  offerId: string;
  email: string;
  fullName: string;
}) {
  return (
    <Widget
      id={TYPEFORM_OFFER_FORM_ID}
      className="fixed inset-0 overflow-auto bg-white"
      hidden={{
        username: username,
        property_id: propertyId,
        offer_id: offerId,
        email: email,
        full_name: fullName
      }}
    />
  );
}
