import { FaqData } from "@/lib/faqs/data";
import FaqCard from "./FaqCard";

export default function FaqBody() {
  return (
    <div className="grid grid-cols-4 my-12 mx-24">
      <div className="col-span-1">
        <h1>Placeholder Nav Section </h1>
      </div>
      <div className="col-span-3">
        {FaqData.map((f) => (
          <FaqCard faq={f} />
        ))}
      </div>
    </div>
  );
}
