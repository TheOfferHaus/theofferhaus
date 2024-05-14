import { Answer, ExtractedAnswers } from "@/config";
import { toWords } from "number-to-words";

/*

HOA thing


offer_made_on_date
num_buyers_words
num_buyers
sellers_current_city
sellers_current_state


closing_costs_responsibility
personal_property_included
earnest_money
earnest_money_deposit_location Turn to the correct text


property_disclosures_agreement_days_num Being moved to a state specific form



Questions for which there is nothing in the template
personal_property_items
earnest_money_deposit_location




purchase_financed_method




 */



// Fields that are needed by all US states
const generalInfo = [
  "buyers_name",
  "current_buyer_address",
  "sellers_name",
  "sellers_current_address",
  "home_type",
  "offer_amount_num",
  "deed_type",
  "down_payment_amount_num",
  "realtor_information",
  "title_search_report_buyer_days_num",
  "title_search_report_seller_days_num",
  "inspection_date",
  "purchase_property_tax_lot",
  "earnest_money_return_days_num",
  "agreement_returned_deadline"
];

const booleanToNot = [
  "sale_contingent_on_other_sale",
  "contingent_on_appraisal",
  "mineral_rights_yes_to_buyer",
  "lead_paint_disclosure",
  "property_includes_land"
];

// sale_contingent_on_other_sale: (ans) =>
// ans.sale_contingent_on_other_sale ? "" : "not",

/**
 * Utility class for extracting and formatting form data for DocuSign integration.
 */
export default class FormDataExtractor {

  /* Dictionary of additional information extractors.
  * This is overwritten in children classes for each US state */
  static additionalInfoExtractors: {
    [key: string]: (input: ExtractedAnswers) => string;
  } = {
      offer_amount_in_words: (ans) =>
        toWords(Number(ans.offer_amount_num)),

      personal_property_included: (ans) =>
        FormDataExtractor.getPersonalPropertyText(ans),

      contingent_address: (ans) =>
        ans.sale_contingent_on_other_sale
          ? ""
          : `Subject Property is Address ${ans.current_buyer_address}. Additional information about this property Sale as follows: ${ans.selling_own_home_stage}`,

      possession_and_tenants: ans =>
        FormDataExtractor.getPosessionAndTenantsText(ans),

      has_loan: ans =>
        FormDataExtractor.getLoanText(ans)
    };


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


  private static getPersonalPropertyText(ans: ExtractedAnswers): string {
    if (ans.personal_property_included) {
      return `There shall be personal property included in this Agreement and/or included in the purchase of the real property. All removable items from the real property, i.e. "non-fixtures", shall be retained by the Seller at closing except those listed below: ${ans.personal_property_items}`;
    }
    return `There shall be no personal property included in this Agreement or included in the purchase of the real property. All removable items from the real property, i.e. "non-fixtures", shall be retained by the Seller at closing.`;
  }

  private static getPosessionAndTenantsText(ans: ExtractedAnswers): string {
    if (ans.are_tenants_present) {
      return `Buyer and Seller will discuss Tenants at a later date`;
    }
    return `Possession of the Property will be delivered by Seller to Buyer by 5:00p.m on the date of Closing`;
  }

  private static getLoanText(ans: ExtractedAnswers): string {
    if (ans.purchase_financed_method === "Buyer Finance") {
      return 'Buyer shall provide Seller written third (3rd) party documentation verifying sufficient funds to close no later than Date/ Time. Seller shall have Days(#Days) business days after the receipt of such documentation to notify Buyer, in writing, if the verification of funds is not acceptable. If Buyer fails to provide such documentation, or if Seller finds such verification of funds is not acceptable, Seller may terminate this Agreement. Failure of Seller to provide Buyer written notice of objection to such verification shall be considered acceptance to verification of funds.';
    } else if (ans.purchase_financed_method === "Other") {
      return `Additional provisions: ${ans.purchase_financed_additional_provisions}`;
    }
    return 'No loan or financing of any kind is required in order to purchase the Property.';
  }

}
