"use client";

import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";

interface AnimatedTradingCounterProps {
  value: number;
  className?: string;
}

interface DigitWheelProps {
  digit: number;
  delay: number;
}

function DigitWheel({ digit, delay }: DigitWheelProps) {
  const [currentDigit, setCurrentDigit] = useState(0);

  const { transform } = useSpring({
    from: { transform: "translateY(0px)" },
    to: { transform: `translateY(-${currentDigit * 40}px)` },
    config: {
      mass: 1,
      tension: 120,
      friction: 14,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentDigit(digit);
    }, delay);

    return () => clearTimeout(timer);
  }, [digit, delay]);

  return (
    <div className="inline-block w-8 h-10 overflow-hidden relative">
      <animated.div style={{ transform }} className="absolute">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} className="h-10 flex items-center justify-center">
            {num}
          </div>
        ))}
      </animated.div>
    </div>
  );
}

// TODO: ui perf
export default function AnimatedTradingCounter({
  value,
  className = "",
}: AnimatedTradingCounterProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // 將數字轉換為字符串，不補零
  const digits = value.toString().split("").map(Number);

  // 為每個數字輪盤設置不同的延遲時間，從右到左（個位數先轉）
  const delays = digits.map(
    (_: number, index: number) => 500 + (digits.length - 1 - index) * 200
  );

  return (
    <div className={`inline-flex items-center ${className}`}>
      {isVisible &&
        digits.map((digit: number, index: number) => (
          <DigitWheel key={index} digit={digit} delay={delays[index]} />
        ))}
    </div>
  );
}
