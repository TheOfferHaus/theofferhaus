import SleekCard from "@/components/SleekCard";

/**
 * CardArea: Component for CardArea on landing page.
 *
 *
 * Home -> CardArea -> SleekCard
 */


const CardArea = () => {
  return (
    <div>
      <div className="grid grid-cols-3">
        <SleekCard
          title="1M+"
          description="homes bought and counting."
          color="subtle-yellow-green"
        />
        <SleekCard
          title=""
          description='"Buying our first home was a breeze with OfferHaus; the team was supportive every step of the way!" - Emily Robinson'
          color="light-gray"
        />
        <SleekCard
          title="#1"
          description="choice for new home owners."
          color="subtle-yellow-green"
        />
        <SleekCard
          title=""
          description='"OfferHaus made the home-buying process straightforward and transparent—I couldn’t be happier with the outcome!" - Mark Johnson'
          color="light-gray"
        />
        <div>
          <SleekCard
            title="5+ years"
            description="empowering buyers."
            color="stem-green"
          />
          <SleekCard
            title="10 minutes"
            description="to complete the application!"
            color="stem-green"
          />
        </div>
        <SleekCard
          title="95%"
          description="of customers would use us again over an agent and recommend us over competitors."
          color="light-gray"
        />
      </div>
    </div>
  );
};

export default CardArea;
