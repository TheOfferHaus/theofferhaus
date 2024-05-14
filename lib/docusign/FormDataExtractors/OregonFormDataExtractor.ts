import FormDataExtractor from "./FormDataExtractor";
import { ExtractedAnswers } from "@/config";

/**
 * Utility class for extracting and formatting form data for DocuSign integration.
 * Specific to the state of Oregon
 */
export default class OregonFormDataExtractor extends FormDataExtractor {

  // Extractor functions for the additional info required by Oregon
  static stateSpecificExtractors: {
    [key: string]: (input: ExtractedAnswers) => string;
  } = {
      property_disclosures_agreement_days_num: (ans) =>
        `${ans.property_disclosures_agreement_days_num}`,
    };

}