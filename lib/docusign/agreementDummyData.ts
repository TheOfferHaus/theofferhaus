const RESIDENTIAL_PURCHASE_AGREEMENT_DUMMY_DATA = {
  buyer_email: "cooperspinelli@gmail.com",
  offer_made_on_date: "10-5-2025",
  buyers_name: "David Sapiro",
  current_buyer_address: "123 Hot St.",
  sellers_name: "Anissa Nishioka",
  sellers_current_address: "456 Cool St.",
  sellers_current_city: "San Francisco",
  sellers_current_state: "California",
  home_type: "single family home",
  purchase_property_tax_lot: "Idk what goes here",
  personal_property_included: `There shall be no personal property included in this Agreement or included in the purchase of the real property. All removable items from the real property, i.e. "non-fixtures", shall be retained by the Seller at closing.`,
  earnest_money: `The Buyer shall provide a monetary deposit that would be deemed consideration ("Earnest Money").`,
  offer_amount_num: 530000,
  offer_amount_in_words: "Five hundred and thirty thousand",
  has_loan: "Buyer Loan or Financing is required in order to purchase the Property.",
  verify_sufficient_funds_deadline_date: "10-6-2025", // Date
  verify_sifficient_funds_deadline_time: "10-7-2025",
  verify_sufficient_funds_seller_days_num: 5,
  sale_contingent_on_other_sale: "", // options are: "not", ""
  contingent_address: "", // options are: "", Subject Property is Address {{address}}
  closing_time_deadline: "10-8-2025, 5:00pm",
  survey_problems_deadline_date: "10-9-2025",
  survey_problems_fix_days_num: 6,
  title_search_report_buyer_days_num: 7,
  title_search_report_seller_days_num: 8,
  inspection_date: "10-9-2025", // Date
  property_disclosures_agreement_days_num: 9,
  agreement_returned_deadline: "10-10-2025, 4:00pm", // Date and time
  closing_costs_responsibility: "Buyer", // options are: "Seller", "Buyer", "both Parties shared equally"
  mineral_rights_yes_to_buyer: "", // options are: "not", ""
  contingent_on_appraisal: "not", // options are: "not", ""
  earnest_money_return_days_num: 10,
  lead_paint_disclosure: "not", // options are: "not", ""
  realtor_information: "" // options are: "", "{{insert some realtor info}}"
};

// Personal property not included:
// There shall be no personal property included in this Agreement or included in the purchase of the real property. All removable items from the real property, i.e. "non-fixtures", shall be retained by the Seller at closing.
// Personal property included:
// There shall be personal property included in this Agreement and/or included in the purchase of the real property. All removable items from the real property, i.e. "non-fixtures", shall be retained by the Seller at closing except those listed below:
//___________________________________________________________


// Earnest money true:
// The Buyer shall provide a monetary deposit that would be deemed consideration ("Earnest Money").
// Earnest Money false:
// The Buyer shall not be required to make a payment, down payment, or any other type of monetary deposit that would be deemed consideration ("Earnest Money").


// Has loan true
// Buyer Loan or Financing is required in order to purchase the Property.
// Has loan false
// No loan or financing of any kind is required in order to purchase the Property.

