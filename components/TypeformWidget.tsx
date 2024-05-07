"use client";

import { Widget } from '@typeform/embed-react';
import { TYPEFORM_FORM_ID } from '@/constants';

/**Component for rendering a TypeForm widget (embeds the form) */

export default function FormWidget({ propertyId } : { propertyId: string}) {
    return <Widget id={TYPEFORM_FORM_ID}
                   className="fixed inset-0 overflow-auto bg-white"
                   hidden={{ property_id: propertyId}} />
};