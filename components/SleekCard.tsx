interface SleekCardProps {
  title: string;
  description: string;
  color: string;
}
/** SleekCard:  Component for displaying a sleek card with a title, description, and customizable background color.
 *
 * props:
 *  - title
 *  - description
 *  - background color (optional -- default to custom-light-blue)
 *
 * {Home, TickingNumberCard} -> SleekCard
 */


const SleekCard: React.FC<SleekCardProps> = ({ title, description, color }) => {
  return (
    <div className={`max-w-sm rounded overflow-hidden shadow-xl bg-${color} m-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-120`}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
      </div>
    </div>
  );
};

export default SleekCard;
