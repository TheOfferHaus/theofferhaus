"use client";
import { Widget } from "@typeform/embed-react";
import { TYPEFORM_INTEREST_FORM_ID } from "@/constants";

/**Component for rendering a TypeForm widget (embeds the form) */

export default function IntroTypeformWidget() {
  return (
    <Widget
      id={TYPEFORM_INTEREST_FORM_ID}
      className="fixed inset-0 overflow-auto bg-white"
    />
  );
}
