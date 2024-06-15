import { useState, useEffect } from "react";

type LeftTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type UseLeftTimeProps = {
  deadline: Date;
  onTimeEnd?: () => void;
};

/**
 * The useLeftTime hook countdown timers and display the time remaining until a specified deadline.
 *
 * @param deadline The target date for the countdown.
 * @param onTimeEnd An optional callback function to be executed when the timer reaches zero.
 */
export default function useLeftTime({ deadline, onTimeEnd }: UseLeftTimeProps) {
  const [leftTime, setLeftTime] = useState<LeftTime>(
    calculateLeftTime(deadline),
  );

  // Set up an effect to update the time left at one-second intervals.
  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +deadline - +new Date();
      if (difference >= 0) {
        setLeftTime(calculateLeftTime(deadline));
      } else {
        clearInterval(timer);
        onTimeEnd && onTimeEnd();
      }
    }, 1000);

    // Clean up the interval when the component unmounts or when the 'deadline' prop changes.
    return () => clearInterval(timer);
  }, [deadline]);

  // Function to calculate the time left.
  function calculateLeftTime(deadline: Date): LeftTime {
    let leftTime: LeftTime = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    // Calculate the time difference between the 'deadline' and the current time.
    const difference = +deadline - +new Date();
    if (difference > 0) {
      // If there is time left, calculate days, hours, minutes, and seconds.
      leftTime = {
        days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 365),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor(difference / 1000 / 60) % 60,
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return leftTime;
  }

  return leftTime;
}
