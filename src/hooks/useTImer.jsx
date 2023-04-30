import { useEffect, useState } from "react";

export default function useTimer(onTimerStop) {
  
  const [time, setTime] = useState(10);
  const [timer, setTimer] = useState(null);

  function start() {
    reset();
    if(timer === null) {
      const _timer = setInterval(countDown, 1000);
      setTimer(_timer);
    }
  }

  useEffect(() => {
    return () => {
      if(timer !== null) clearInterval(timer);
    }
  }, [timer]);

  function countDown() {
    setTime(prev => prev - 1);
  }

  useEffect(() => {
    if(time < 0) {
      onTimerStop?.();
      reset();
    }
  }, [time]);

  function reset() {
    setTime(10);
    if(timer !== null) clearInterval(timer);
    setTimer(null);
  }

  return {
    time,
    reset,
    start,
  };
};