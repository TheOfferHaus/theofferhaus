import FormDataExtractor from "./FormDataExtractor";
import { toWords } from "number-to-words";
import { ExtractedAnswers } from "@/types/docusignTypes";

/**
 * Utility class for extracting and formatting form data for DocuSign integration.
 * Specific to the state of Oregon
 */
export default class OregonFormDataExtractor extends FormDataExtractor {

  // Extractor functions for the additional info required by Oregon
  static additionalInfoExtractors: {
    [key: string]: (input: ExtractedAnswers) => string;
  } = {
      earnest_money: (ans) =>
        OregonFormDataExtractor.getEarnestMoneyText(ans.earnest_money as boolean),

      purchase_property_tax_lot: (ans) =>
        `${ans.purchase_property_tax_lot}`,

      personal_property_included: (ans) =>
        OregonFormDataExtractor.getPersonalPropertyText(ans),

      sale_contingent_on_other_sale: (ans) =>
        ans.sale_contingent_on_other_sale ? "" : "not",

      contingent_address: (ans) =>
        ans.sale_contingent_on_other_sale
          ? ""
          : `Subject Property is Address ${ans.contingent_address}`,

      offer_amount_in_words: (ans) =>
        toWords(Number(ans.offer_amount_num)),

      survey_problems_deadline_date: (ans) =>
        `${ans.survey_problems_deadline_date}`,

      survey_problems_fix_days_num: (ans) =>
        `${ans.survey_problems_fix_days_num}`,

      title_search_report_buyer_days_num: (ans) =>
        `${ans.title_search_report_buyer_days_num}`,

      title_search_report_seller_days_num: (ans) =>
        `${ans.title_search_report_seller_days_num}`,

      inspection_date: (ans) =>
        `${ans.inspection_date}`,

      property_disclosures_agreement_days_num: (ans) =>
        `${ans.property_disclosures_agreement_days_num}`,

      agreement_returned_deadline: (ans) =>
        `${ans.agreement_returned_deadline}`,

      closing_costs_responsibility: (ans) =>
        OregonFormDataExtractor.getClosingCostResponsibilityText(ans.closing_costs_responsibility as string),

      mineral_rights_yes_to_buyer: (ans) =>
        ans.mineral_rights_yes_to_buyer ? '' : 'not',

      contingent_on_appraisal: (ans) =>
        ans.contingent_on_appraisal ? '' : 'not',

      earnest_money_return_days_num: ans =>
        `${ans.earnest_money_return_days_num}`,

      lead_paint_disclosure: (ans) =>
        ans.lead_paint_disclosure ? '' : 'not',

      realtor_information: ans =>
        ans.realtor_involved ? `${ans.realtor_information}` : '',

      possession_and_tenants: ans =>
        OregonFormDataExtractor.getPosessionAndTenantsText(ans),

      has_loan: ans =>
        OregonFormDataExtractor.getLoanText(ans.has_loan as boolean)
    };

  private static getPersonalPropertyText(ans: ExtractedAnswers): string {
    if (ans.personal_property_included) {
      return `There shall be personal property included in this Agreement and/or included in the purchase of the real property. All removable items from the real property, i.e. "non-fixtures", shall be retained by the Seller at closing except those listed below: ${ans.personal_property_items}`;
    }
    return `There shall be no personal property included in this Agreement or included in the purchase of the real property. All removable items from the real property, i.e. "non-fixtures", shall be retained by the Seller at closing.`;
  }

  private static getClosingCostResponsibilityText(userChoice: string): string {
    if (userChoice === "The Seller") {
      return "Seller";
    } else if (userChoice === "You the Buyer") {
      return "Buyer";
    } else {
      return "both Parties shared equally";
    }
  }

  private static getPosessionAndTenantsText(ans: ExtractedAnswers): string {
    if (ans.yes_to_possesion && ans.yes_to_tenants) {
      return `Buyer will accept all tenants at Closing, and unless provided otherwise in this Agreement, all rents will be prorated as of Closing, and all deposits held on behalf of tenants by Seller will be transferred to Buyer through Escrow at Closing.`;
    } else if (ans.yes_to_possesion) {
      return `Seller will remove all tenants before Closing, pay any legally-required tenant relocation costs, and deliver possession to Buyer by 5:00 p.m. on the date of Closing.`;
    } else if (ans.possesion_tenant_time) {
      return `Possession of the Property will be delivered by Seller to Buyer by [filled out time] on the date of Closing`;
    } else {
      return `Possession of the Property will be delivered by Seller to Buyer by 5:00p.m on the date of Closing`;
    }
  }

  private static getLoanText(userChoice: boolean): string {
    if (userChoice) {
      return 'Buyer Loan or Financing is required in order to purchase the Property.';
    }
    return 'No loan or financing of any kind is required in order to purchase the Property.';
  }

  private static getEarnestMoneyText(userChoice: boolean): string {
    if (userChoice) {
      return 'The Buyer shall provide a monetary deposit that would be deemed consideration ("Earnest Money").';
    }

    return 'The Buyer shall not be required to make a payment, down payment, or any other type of monetary deposit that would be deemed consideration ("Earnest Money").';
  }

}