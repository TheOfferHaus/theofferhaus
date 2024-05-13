"use client";

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

interface CommissionTickerProps {
  initialAmount?: number;
  incrementAmount: number;
}

const CommissionTicker: React.FC<CommissionTickerProps> = ({
  initialAmount = 0,
  incrementAmount,
}) => {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [prevAmount, setPrevAmount] = useState<number>(initialAmount);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevAmount(amount);
      setAmount((prevAmount) => prevAmount + incrementAmount);
    }, 1000);

    return () => clearInterval(interval);
  }, [amount, incrementAmount]);

  return (
    <div>
      <CountUp
        start={prevAmount}
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
