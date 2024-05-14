import { Faq } from "@/lib/faqs/data";

export default function FaqCard({ faq }: { faq: Faq }) {
  return (
    <div className="mb-20">
      <h3 className="text-2xl font-bold mb-4">{faq.question}</h3>
      <p className="text-lg">{faq.answer}</p>
    </div>
  );
}
