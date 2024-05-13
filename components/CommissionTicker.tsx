'use client';
import React, { useEffect, useState } from 'react';

/**  */
interface CommissionTickerProps {
  initialAmount?: number;
  incrementAmount: number;
}

const CommissionTicker: React.FC<CommissionTickerProps> = ({ initialAmount = 0, incrementAmount }) => {
  const [amount, setAmount] = useState<number>(initialAmount);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount((prevAmount) => prevAmount + incrementAmount);
    }, 1000);

    return () => clearInterval(interval);
  }, [incrementAmount]);

  return (
    <div>
      ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </div>
  );
};

export default CommissionTicker;