"use client";

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

/**
 * Incrementing numbers component for numbers animation.
 */

interface CommissionTickerProps {
  initialAmount?: number;
  incrementAmount: number;
}

const CommissionTicker: React.FC<CommissionTickerProps> = ({
  initialAmount = 0,
  incrementAmount,
}) => {
  const [amount, setAmount] = useState<number>(initialAmount);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount((prevAmount) => prevAmount + incrementAmount);
    }, 1000);

    return () => clearInterval(interval);
  }, [incrementAmount]);

  return (
    <div>
      <CountUp
        start={Math.max(0, amount - incrementAmount)}
        end={amount}
        duration={0.1}
        separator=","
        decimals={2}
        decimal="."
        prefix="$"
      />
    </div>
  );
};

export default CommissionTicker;
