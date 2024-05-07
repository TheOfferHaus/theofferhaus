type ExtractedAnswers = {
  [key: string]: string | boolean;
}

interface Answer {
  choice?: { label: string };
  boolean?: boolean;
  text?: string;
  number?: number;
  date?: string;
}

const dataExtractors: { [key: string]: (input: Answer) => any } = {
  choice: (ans: Answer) => ans.choice?.label,
  boolean: (ans: Answer) => ans.boolean,
  text: (ans: Answer) => ans.text,
  number: (ans: Answer) => ans.number,
  date: (ans: Answer) => ans.date,
};

const generalInfo = new Set([
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

]);

// TODO: write this.
function formatFormDataForDocusign(formData: ExtractedAnswers): {[key: string]: string} {
  const formatted = {};

  return {}
}


function extractAnswers(answers: any[]): ExtractedAnswers {
  const extractedAnswers: ExtractedAnswers = {};

  for (let answer of answers) {
    const answerRef: string = answer.field.ref;
    const answerType: string = answer.type;

    extractedAnswers[answerRef] = dataExtractors[answerType](answer);
  }

  return extractedAnswers;
}


export {
  formatFormDataForDocusign
};