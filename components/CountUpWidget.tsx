import React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import CommissionTicker from "@/components/CommissionTicker";

/**
 * Component for Counting-up widget for landing page. Animated number + description.
 */

const CountUpWidget = () => {
  return (
    <div>
      <Card className="bg-primary-medium shadow-xl pb-2 flex justify-center rounded-t-none rounded-b-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <CardContent className="pt-2 text-4xl text-custom-white font-bold text-center -mb-6 md:ml-32 ml-0 2xl:text-5xl">
            <CommissionTicker incrementAmount={1519.42} />
          </CardContent>
          <CardDescription className="text-sm px-2 pb-2 pt-2 text-custom-white text-center md:mr-32 mr-0 md:text-lg md:px-0 max-w-2xl">
            *In the U.S. with a median home value of $340,000&nbsp;and an
            average commission rate of 5.49%, buyers are&nbsp;paying
            $47,916,720,000 in fees&nbsp;yearly.
            That's&nbsp;$1,519.42&nbsp;per&nbsp;second&nbsp;in&nbsp;fees!
          </CardDescription>
        </div>
      </Card>
    </div>
  );
};

export default CountUpWidget;
