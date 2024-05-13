"use client";

import { Widget } from "@typeform/embed-react";
import { TYPEFORM_OFFER_FORM_ID } from "@/constants";

/**Component for rendering a TypeForm widget (embeds the form) */

export default function TypeformWidget({
  username,
  propertyId,
  offerId,
}: {
  username: string;
  propertyId: string;
  offerId: string;
}) {
  return (
    <Widget
      id={"g0qtEedy"}
      className="fixed inset-0 overflow-auto bg-white"
      hidden={{
        username: username,
        property_id: propertyId,
        offer_id: offerId,
      }}
    />
  );
}
