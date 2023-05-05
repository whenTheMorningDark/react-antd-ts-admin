import { useEffect, useState, useRef } from 'react';

export type ITimerRef = ReturnType<typeof setTimeout>
const initTimer = setTimeout(() => null, Math.max());
const useTimer = (initTime: number) => {
  console.log('123');
  const [value, setValue] = useState(initTime);
  const timer = useRef<ITimerRef>(initTimer);
  const clearTm = () => timer && clearTimeout(timer.current);
  useEffect(() => {
    clearTm();
    return () => clearTm();
  }, []);
  useEffect(() => {
    console.log(value < 200, 'value');
    if (value < 200) {
      timer.current = setTimeout(() => {
        console.log('cccc');
        setValue(value + 20);
      }, 100);
    }
    // if (value > 200) {
    //   clearTm();
    // }

  }, [value]);
  return [value];
};

export {
  useTimer
};