/** Section component for user page in admin dashboard
 *
 * Takes: {title, description}
 */
export default function Section({
  title,
  description = "None",
}: {
  title: string;
  description?: string | React.ReactNode;
}) {
  return (
    <div className="px-6 py-10 grid grid-cols-5">
      <dt className="text-lg col-span-1">{title}</dt>
      <dd className="px-11 text-md col-span-4">{description}</dd>
    </div>
  );
}
