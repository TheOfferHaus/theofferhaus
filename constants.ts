import { USStatesObject } from "./types/types";

//const TYPEFORM_OFFER_FORM_ID = "vBOEFE8R";
const TYPEFORM_OFFER_FORM_ID = "wA5lHKUs";
const TYPEFORM_INTEREST_FORM_ID = "g0qtEedy";
const RADAR_VALIDATE_ADDRESS_API_URL =
  "https://api.radar.io/v1/addresses/validate";

const TYPEFORM_API_BASE_URL = "https://api.typeform.com";

const US_STATES: USStatesObject = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

// TODO: add references to this array as needed as we edit the Typeform
// ex) appraisal due date and negotiation due date will need to be added here
const OFFER_DETAIL_REFERENCES = [
  "offer_amount_num",
  "closing_time_deadline",
  "down_payment_amount_num",
  "earnest_money",
  "inspection_date",
];

export {
  TYPEFORM_OFFER_FORM_ID,
  RADAR_VALIDATE_ADDRESS_API_URL,
  TYPEFORM_INTEREST_FORM_ID,
  US_STATES,
  TYPEFORM_API_BASE_URL,
  OFFER_DETAIL_REFERENCES,
};
