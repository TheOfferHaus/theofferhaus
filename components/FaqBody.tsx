import { FAQs } from "@/lib/faqs/data";
import FaqCard from "./FaqCard";

/** Body component for the FAQ page */

export default function FaqBody() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 my-12">
      <div className="md:col-span-1 mb-10 mx-8 md:mr-4 md:ml-12">
        <p className="font-extrabold text-lg mb-1">Go to</p>
        <hr className="mb-4" />
        {FAQs.map((f, i) => (
          <a href={`#${i}`} key={i}>
            <div className="hover:underline mb-3">
              {f.question}
            </div>
          </a>
        ))}
      </div>
      <div className="md:col-span-3 md:mx-12 mx-8">
        {FAQs.map((f, i) => (
          <div id={`${i}`} key={i}>
            <FaqCard faq={f} />
          </div>
        ))}
      </div>
    </div>
  );
}