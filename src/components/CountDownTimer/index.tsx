// components/CountdownTimer.jsx
import { useState, useEffect } from "react";
interface CountdownTimerProps {
  initialSeconds: number;
}

export default function CountdownTimer({
  initialSeconds,
}: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  // преобразуем секунды в ЧЧ:ММ:СС
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => String(num).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <div
      style={{ fontSize: "2rem", fontFamily: "monospace", fontWeight: "bold" }}
    >
      {formatTime(secondsLeft)}
    </div>
  );
}
