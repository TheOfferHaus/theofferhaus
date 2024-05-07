/**Component for footer.*/

const Footer = () => {
  return (
    <footer className="bg-custom-white w-full p-2 md:py-4">
      {/* Container with navigation links */}
      <div className="w-full max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <ul className="text-gray-500 dark:text-gray-400 flex flex-wrap items-center text-sm font-medium mb-2 sm:mb-0">
          <li>
            <a href="#" className="mr-3 hover:underline md:mr-5">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="mr-3 hover:underline md:mr-5">
              FAQs
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Footer copyright section */}
      <div className="w-full max-w-screen-xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
        © 2024{" "}
        <a href="#" className="hover:underline">
          The Offer Haus™
        </a>
        . All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
