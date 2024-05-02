"use client";

import { Widget } from '@typeform/embed-react';
import { TYPEFORM_FORM_ID } from '@/constants';

/** FormWidget: Component for rendering a TypeForm widget (embeds the form)
 *
 *
 * Quiz -> FormWidget
 */

const FormWidget = () => {
    return <Widget id={TYPEFORM_FORM_ID} className="fixed inset-0 overflow-auto bg-white" />;
};

export default FormWidget;