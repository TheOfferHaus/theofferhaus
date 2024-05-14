import { Answer, ExtractedAnswers } from "@/config";
import { toWords } from "number-to-words";

/*
Fields in template which are not quite fields in typeform
  (derived values, or not yet supported)
Not supported
  num_buyers_words
  num_buyers

Derived Values
  sellers_current_city
  sellers_current_state

stuff to get some other way

property_disclosures_agreement_days_num Being moved to a state specific form


Questions for which there is nothing in the template
personal_property_items
earnest_money_deposit_location
 */


/**
 * Utility class for extracting and formatting form data for DocuSign integration.
 */
export default class FormDataExtractor {
  static generalInfo = [
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
    "agreement_returned_deadline",
    "closing_costs_responsibility"
  ];

  static booleanToNot = [
    "sale_contingent_on_other_sale",
    "contingent_on_appraisal",
    "mineral_rights_yes_to_buyer",
    "lead_paint_disclosure",
    "property_includes_land",
  ];

  /* Dictionary of additional information extractors.
   * This is overwritten in children classes for each US state */
  static stateSpecificExtractors: {
    [key: string]: (input: ExtractedAnswers) => string;
  } = {}

  static additionalInfoExtractors: {
    [key: string]: (input: ExtractedAnswers) => string;
  } = {
    offer_amount_in_words: (ans) => toWords(Number(ans.offer_amount_num)),

    personal_property_included: (ans) =>
      FormDataExtractor.getPersonalPropertyText(ans),

    contingent_address: (ans) =>
      ans.sale_contingent_on_other_sale
        ? ""
        : `Subject Property is Address ${ans.current_buyer_address}. Additional information about this property Sale as follows: ${ans.selling_own_home_stage}`,

    possession_and_tenants: (ans) =>
      FormDataExtractor.getPosessionAndTenantsText(ans),

    purchase_financed_method: (ans) => FormDataExtractor.getLoanText(ans),

    offer_made_on_date: (ans) => `${new Date().toLocaleDateString('en-us',{year:"numeric", month:"numeric", day:"numeric"})}`,

    has_hoa: (ans) => FormDataExtractor.getHOAText(ans),

    closing_cost_additional_info: (ans) => FormDataExtractor.getClosingCostText(ans),

    earnest_money: (ans) => FormDataExtractor.getEarnestMoneyText(ans),

    earnest_money_location: (ans) => FormDataExtractor.getEarnestMoneyLocationText(ans),

    current_buyer_address: (ans) => FormDataExtractor.getBuyerAddress(ans),
  };

  /**
   * Extracts and formats form data for DocuSign.
   * @param {Answer[]} formData - The form data to be processed.
   * @returns {[key: string]: string;} - Form data formatted for DocuSign.
   */
  static getFormattedFormDataForDocusign(formData: Answer[]): {
    [key: string]: string;
  } {
    const extractedAnswers = FormDataExtractor.extractAnswers(formData);


    const formatted =
      FormDataExtractor.formatGeneralInfoAnswersForDocusign(extractedAnswers);

    const formattedBooleans = FormDataExtractor.formatBooleanAnswersForDocusign(extractedAnswers);

    for (let [field, value] of Object.entries(formattedBooleans)) {
      formatted[field] = value;
    }

    for (const [field, extractor] of Object.entries(
      this.additionalInfoExtractors
    )) {
      formatted[field] = extractor(extractedAnswers);
    }

    for (const [field, extractor] of Object.entries(
      this.stateSpecificExtractors
    )) {
      formatted[field] = extractor(extractedAnswers);
    }

    return formatted;
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
        answer.type === "choice" ? answer.choice!.label : answer[answer.type],
      ])
    );
  }


  /**
   * Formats general information answers for DocuSign.
   * @param {ExtractedAnswers} answers - Extracted answers.
   * @returns {object} - Formatted general information answers.
   */
  private static formatGeneralInfoAnswersForDocusign(
    answers: ExtractedAnswers
  ): {
    [key: string]: string;
  } {
    return Object.fromEntries(
      FormDataExtractor.generalInfo.map((field) => [field, String(answers[field])])
    );
  }


  /**
   * Formats boolean information answers to 'not' or ''.
   * @param {ExtractedAnswers} answers - Extracted answers.
   * @returns {object} - Formatted general information answers.
   */
  private static formatBooleanAnswersForDocusign(answers: ExtractedAnswers): {
    [key: string]: string;
  } {
    return Object.fromEntries(
      FormDataExtractor.booleanToNot.map((field) => [field, answers[field] ? "" : "not"])
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

    const formattedBooleans = FormDataExtractor.formatBooleanAnswersForDocusign(answers);

    for (let [field, value] of Object.entries(formattedBooleans)) {
      formatted[field] = value;
    }

    for (const [field, extractor] of Object.entries(
      this.additionalInfoExtractors
    )) {
      formatted[field] = extractor(answers);
    }

    for (const [field, extractor] of Object.entries(
      this.stateSpecificExtractors
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
      return "Buyer shall provide Seller written third (3rd) party documentation verifying sufficient funds to close no later than Date/ Time. Seller shall have Days(#Days) business days after the receipt of such documentation to notify Buyer, in writing, if the verification of funds is not acceptable. If Buyer fails to provide such documentation, or if Seller finds such verification of funds is not acceptable, Seller may terminate this Agreement. Failure of Seller to provide Buyer written notice of objection to such verification shall be considered acceptance to verification of funds.";
    } else if (ans.purchase_financed_method === "Other") {
      return `Additional provisions: ${ans.purchase_financed_additional_provisions}`;
    }
    return "No loan or financing of any kind is required in order to purchase the Property.";
  }

  private static getHOAText(ans: ExtractedAnswers): string {
    if (ans.has_hoa) {
      return "Seller to send Buyer OREF 024 - Homeowners Association/Townhome/Planned Community Addendum. In this Agreement,  “townhome” means a connected home where the owner also owns the ground beneath the home, and “Planned Community” means a residential subdivision, not a condominium or timeshare, in which owners are collectively responsible for part of the subdivision."
    }

    return ""
  }

  private static getClosingCostText(ans: ExtractedAnswers): string {
    if (ans.closing_costs_responsibility !== 'Buyer') {
      `Additional Information as follows: ${ans.closing_costs_responsibility_other || ans.closing_costs_responsibility_seller}`
    }
    return '';
  }

  private static getEarnestMoneyText(ans: ExtractedAnswers): string {
    if (ans.earnest_money) {
      return `The Buyer shall provide a monetary deposit that would be deemed consideration ("Earnest Money").`;
    }
    return 'The Buyer shall not be required to make a payment, down payment, or any other type of monetary deposit that would be deemed consideration ("Earnest Money").';
  }

  private static getEarnestMoneyLocationText(ans: ExtractedAnswers): string {
    if (ans.earnest_money) {
      return `The Earnest Money will be deposited at ${ans.earnest_money_deposit_location}`
    }
    return '';
  }

  private static getBuyerAddress(ans: ExtractedAnswers): string {
    return `${ans['5705500f-691b-4b40-9e21-a7232ba38654']} ${ans['850b0283-3cb4-455c-9698-f4acddc75034']}, ${ans['b5cd018b-1bf7-4fba-895e-4939b00f69e9']}, ${ans["14125393-a333-4cd7-9fac-e88ed2bc8ead"]} ${ans["b8a5110a-aec8-48b1-aa02-36f829b7bc42"]}, ${ans["7445e581-84af-414d-9a23-f16f9ecec5e9"]}`
  }
}
