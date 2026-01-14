import { useState } from 'react';

type UseCounterReturn = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

type UseCounterOptions = {
  initialValue?: number;
  step?: number;
};

export const useCounter = ({ initialValue = 0, step = 1 }: UseCounterOptions): UseCounterReturn => {
  // usss
  const [count, setCount] = useState(initialValue);

  // Metotlar
  const increment = () => {
    setCount(count + step);
  };
  const decrement = () => {
    setCount(count - step);
  };
  const reset = () => {
    setCount(initialValue);
  };
  return { count, increment, decrement, reset };
};
