"use client";

import { Widget } from '@typeform/embed-react';
import { TYPEFORM_FORM_ID } from '@/constants';

/**Component for rendering a TypeForm widget (embeds the form) */

const FormWidget = () => {

    // function handleFinalQuestion({formId, ref} : {formId: string, ref: string}) {
    //     // check if user is logged in via clerk
    //     // if not logged in redirect to signin/signup page, which will redirect back to current form and question
    // }
    return <Widget id={TYPEFORM_FORM_ID}
                   className="fixed inset-0 overflow-auto bg-white"
                   keepSession={true} />
                //    onQuestionChanged={handleFinalQuestion}/>;
};

export default FormWidget;