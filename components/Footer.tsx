/**Component for footer.*/

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full p-2 md:py-4 text-sm absolute bottom-0 bg-custom-white">
      <div className="mx-auto flex flex-col sm:flex-row items-center justify-between pl-4">
        <ul className="flex items-center font-medium mb-2 sm:mb-0">
          <li>
            <Link href="/about" className="mr-3  hover:text-primary-dark md:mr-5">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/faqs" className="mr-3 hover:text-primary-dark md:mr-5">
              FAQs
            </Link>
          </li>
          <li>
            <Link href="/contact" className=" hover:text-primary-dark">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-full mx-auto text-center mt-2">
        © 2024&nbsp;
        <a href="#" className=" hover:text-primary-dark">
          The Offer Haus™
        </a>
        . All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
