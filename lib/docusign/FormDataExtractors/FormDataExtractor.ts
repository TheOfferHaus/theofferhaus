type ExtractedAnswers = {
  [key: string]: string | boolean;
};

interface Answer {
  field: { ref: string; };
  type: string;
  choice?: { label: string; };
  boolean?: boolean;
  text?: string;
  number?: number;
  date?: string;
}

const dataExtractors: { [key: string]: (input: Answer) => any; } = {
  choice: (ans: Answer) => ans.choice?.label,
  boolean: (ans: Answer) => ans.boolean,
  text: (ans: Answer) => ans.text,
  number: (ans: Answer) => ans.number,
  date: (ans: Answer) => ans.date,
};

const generalInfo = [
  'buyer_email',
  'buyers_name',
  'current_buyer_address',
  'sellers_name',
  'sellers_current_address',
  'sellers_current_city',
  'sellers_current_state',
  'home_type',
  'offer_amount_num',
  'offer_made_on_date',
  'verify_sufficient_funds_deadline_date',
  'verify_sufficient_funds_deadline_time',
  'verify_sufficient_funds_seller_days_num',
  'closing_time_deadline',
  'deed_type'
];

export default class FormDataExtractor {
  static additionalInfoExtractors: {
    [key: string]: (input: ExtractedAnswers) => string;
  } = {};

  static getFormattedFormDataForDocusign(formData: Answer[]) {
    const extractedAnswers = FormDataExtractor._extractAnswers(formData);
    return FormDataExtractor._formatAnswersForDocusign(extractedAnswers);
  }

  static _extractAnswers(answers: Answer[]): ExtractedAnswers {
    return Object.fromEntries(
      answers.map(answer =>
        [answer.field.ref, dataExtractors[answer.type](answer)]));
  }

  static _formatGeneralInfoAnswersForDocusign(answers: ExtractedAnswers): { [key: string]: string; } {
    return Object.fromEntries(
      generalInfo.map(field => [field, String(answers[field])])
    );
  }

  static _formatAnswersForDocusign(answers: ExtractedAnswers): { [key: string]: string; } {
    const formatted = FormDataExtractor._formatGeneralInfoAnswersForDocusign(answers);

    for (const [field, extractor] of Object.entries(this.additionalInfoExtractors)) {
      formatted[field] = extractor(answers);
    }

    return formatted;
  }
}