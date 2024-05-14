import { FAQ } from "@/lib/faqs/types";

/** Card component that displays a single FAQ */

export default function FaqCard({ faq }: { faq: FAQ }) {
  return (
    <div className="mb-20">
      <h3 className="text-2xl font-bold mb-4">{faq.question}</h3>
      <p className="text-lg">{faq.answer}</p>
    </div>
  );
}
