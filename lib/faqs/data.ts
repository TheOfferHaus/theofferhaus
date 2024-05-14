/** Data for FAQs page
 *
 * **ALL DUMMY DATA BELOW**
 */

type Faq = {
  question: string;
  answer: string;
};

const FaqData = [
  {
    question: "What is a real estate offer?",
    answer:
      "A real estate offer is a formal proposal to purchase a property, detailing the offer price, terms and conditions, and any contingencies that need to be met before finalizing the sale.",
  },
  {
    question: "How do I make an offer on a house?",
    answer:
      "You can submit a written offer directly through our platform. Include details such as your proposed purchase price, financing details, and any contingencies, like the need for a home inspection or securing a mortgage.",
  },
  {
    question: "What are contingencies in a real estate offer?",
    answer:
      "Contingencies are conditions that must be met for the transaction to proceed. Common contingencies include successful home inspections, approval of financing, and the sale of your current home, if applicable.",
  },
  {
    question: "How long does the seller have to respond to my offer?",
    answer:
      "The response time varies, but typically, sellers have 24 to 48 hours to respond to an offer. This timeframe can be adjusted based on the terms agreed upon in the offer.",
  },
  {
    question: "What happens if my offer is rejected?",
    answer:
      "If your offer is rejected, you can choose to submit a new offer, wait for another suitable property, or consider other available properties. Sometimes, feedback on why the offer was rejected can be provided, aiding in future negotiations.",
  },
  {
    question: "Can I withdraw my offer?",
    answer:
      "Yes, you can usually withdraw your offer before it is accepted, particularly if it hasn’t been signed by both parties. If the offer has been accepted and signed, withdrawing it might lead to legal implications.",
  },
  {
    question: "What is earnest money?",
    answer:
      "Earnest money is a deposit made to demonstrate the seriousness of your offer. It's held in an escrow account and applied to the purchase price at closing. If the deal falls through due to a contingency not being met, the earnest money is typically refunded.",
  },
  {
    question: "How do I negotiate the purchase price?",
    answer:
      "The purchase price can be negotiated based on market conditions, property condition, and demand. This is typically done through counteroffers until an agreement is reached.",
  },
  {
    question: "What should I expect during the closing process?",
    answer:
      "The closing process involves finalizing the transaction by signing documents, paying closing costs, and transferring the title. This process can take several weeks and involves several legal and financial steps.",
  },
  {
    question: "How can I protect myself during the buying process?",
    answer:
      "It's advisable to conduct thorough inspections, ensure all contingencies are clearly defined, and fully understand the contract. Also, consider obtaining title insurance to protect against any issues with the property title.",
  },
];

export { FaqData };
export type { Faq };
