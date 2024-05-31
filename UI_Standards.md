## Tips for UI styling + general guidance for design and style.

- Components directly above the footer should add a `mb-12` (margin-bottom 12) on outermost div to ensure responsiveness. Currently elements may fall behind the footer, because the position is 'absolute'.

- Offer Haus color scheme options-- these are found in tailwind config file. These colors can be utilized site-wide, such as: primary-dark, primary-medium, off-white...

- We adivise against using 'bold' text to adhere to cohesive application style. Simply increase font size, and if absolutely necessary-- `semi-bold` is acceptable. The slimmer the font, the sleeker and more in-line with Offer Haus general style.

- If adding a button click, make sure to add a smooth transition, such as: transition duration-150 ease-in-out transform hover:scale-95. An example of the button click can be found in **components > Body.tsx**

- Be mindful of varying screen-sizes. Optimize for *small, medium, large, and XL screens*. With tailwind, this would look something like this within a class of a div: sm:value, md:value, lg:value, xl:value, 2xl:value...

