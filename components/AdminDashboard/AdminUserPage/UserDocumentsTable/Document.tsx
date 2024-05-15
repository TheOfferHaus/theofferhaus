import { PaperClipIcon } from "@heroicons/react/16/solid";

/** Component for one instance of a document
 * rendered within DocumentDataTable component
 */
export function Document({ name, link = "#" }: { name: string; link: string }) {
  return (
    <li className="flex py-4 px-5 text-sm justify-between">
      <div className="flex">
        <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
        <div className="ml-4">{name}</div>
      </div>
      <div className="ml-4">
        <a href={link} className=" hover:text-primary-dark">
          Download
        </a>
      </div>
    </li>
  );
}
