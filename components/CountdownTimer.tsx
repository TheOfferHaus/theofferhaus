"use client";

import React, { useState, useEffect } from 'react';

interface CountdownProps {
    targetDate: Date;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownProps) {
    const calculateTimeLeft = () => {
        const difference = Number(new Date(targetDate)) - Number(new Date());

        let timeLeft: TimeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents: JSX.Element[] = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval as keyof TimeLeft]) {
            return;
        }

        timerComponents.push(
            <span key={interval} suppressHydrationWarning={true}>
                {timeLeft[interval as keyof TimeLeft]} {interval}{' '}
            </span>
        );
    });

    return (
        <span>
            {timerComponents.length ? timerComponents : <span>Past Due Date!</span>}
        </span>
    );
};
