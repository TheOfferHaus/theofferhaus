import FormDataExtractor from "./FormDataExtractor";
import { ExtractedAnswers } from "@/config";

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

      property_disclosures_agreement_days_num: (ans) =>
        `${ans.property_disclosures_agreement_days_num}`,

      agreement_returned_deadline: (ans) =>
        `${ans.agreement_returned_deadline}`,

      closing_costs_responsibility: (ans) =>
        OregonFormDataExtractor.getClosingCostResponsibilityText(ans.closing_costs_responsibility as string),

    };


  private static getClosingCostResponsibilityText(userChoice: string): string {
    if (userChoice === "The Seller") {
      return "Seller";
    } else if (userChoice === "You the Buyer") {
      return "Buyer";
    }
    return "both Parties shared equally";
  }

  private static getEarnestMoneyText(userChoice: boolean): string {
    if (userChoice) {
      return 'The Buyer shall provide a monetary deposit that would be deemed consideration ("Earnest Money").';
    }
    return 'The Buyer shall not be required to make a payment, down payment, or any other type of monetary deposit that would be deemed consideration ("Earnest Money").';
  }

}