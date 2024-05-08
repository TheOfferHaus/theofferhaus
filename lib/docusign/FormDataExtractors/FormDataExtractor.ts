import { Answer, ExtractedAnswers } from "@/types/docusignTypes";

// Fields that are needed by all US states
const generalInfo = [
  "buyer_email",
  "buyers_name",
  "current_buyer_address",
  "sellers_name",
  "sellers_current_address",
  "sellers_current_city",
  "sellers_current_state",
  "home_type",
  "offer_amount_num",
  "offer_made_on_date",
  "verify_sufficient_funds_deadline_date",
  "verify_sufficient_funds_deadline_time",
  "verify_sufficient_funds_seller_days_num",
  "closing_time_deadline",
  "deed_type",
];

/**
 * Utility class for extracting and formatting form data for DocuSign integration.
 */
export default class FormDataExtractor {

  /* Dictionary of additional information extractors.
  * This is overwritten in children classes for each US state */
  static additionalInfoExtractors: {
    [key: string]: (input: ExtractedAnswers) => string;
  } = {};


  /**
   * Extracts and formats form data for DocuSign.
   * @param {Answer[]} formData - The form data to be processed.
   * @returns {[key: string]: string;} - Form data formatted for DocuSign.
   */
  static getFormattedFormDataForDocusign(formData: Answer[]): { [key: string]: string; } {
    const extractedAnswers = FormDataExtractor.extractAnswers(formData);
    return FormDataExtractor.formatAnswersForDocusign.call(this, extractedAnswers);
  }

  /**
   * Extracts answers from the provided form data.
   * @param {Answer[]} answers - The answers from the form.
   * @returns {ExtractedAnswers} - Extracted answers mapped by field reference.
   */
  private static extractAnswers(answers: Answer[]): ExtractedAnswers {
    return Object.fromEntries(
      answers.map((answer) => [
        answer.field.ref,
        answer.type === "choice"
          ? answer.choice!.label
          : answer[answer.type]
      ])
    );
  }

  /**
   * Formats general information answers for DocuSign.
   * @param {ExtractedAnswers} answers - Extracted answers.
   * @returns {object} - Formatted general information answers.
   */
  private static formatGeneralInfoAnswersForDocusign(answers: ExtractedAnswers): {
    [key: string]: string;
  } {
    return Object.fromEntries(
      generalInfo.map((field) => [field, String(answers[field])])
    );
  }

  /**
   * Formats answers for DocuSign including the additional info
   * (which will be added in children classes).
   *
   * @param {ExtractedAnswers} answers - Extracted answers.
   * @returns {object} - Formatted answers for DocuSign.
   */
  private static formatAnswersForDocusign(answers: ExtractedAnswers): {
    [key: string]: string;
  } {
    const formatted =
      FormDataExtractor.formatGeneralInfoAnswersForDocusign(answers);

    for (const [field, extractor] of Object.entries(
      this.additionalInfoExtractors
    )) {
      formatted[field] = extractor(answers);
    }

    return formatted;
  }
}
