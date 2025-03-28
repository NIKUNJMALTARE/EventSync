
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

const AnimatedNumber = ({ value, duration = 800, className }: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValueRef = useRef(0);
  
  useEffect(() => {
    previousValueRef.current = displayValue;
    
    let startTime: number | null = null;
    const startValue = previousValueRef.current;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setDisplayValue(Math.floor(startValue + progress * (value - startValue)));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };
    
    window.requestAnimationFrame(step);
    
    return () => {
      startTime = null;
    };
  }, [value, duration]);
  
  return <span className={cn("transition-all", className)}>{displayValue}</span>;
};

export default AnimatedNumber;
