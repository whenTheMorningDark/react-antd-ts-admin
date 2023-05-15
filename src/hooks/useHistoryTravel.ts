/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { useRef, useState } from 'react';
import useMemoizedFn from './useMemoizedFn';

interface IData<T> {
  present?: T;
  past: T[];
  future: T[];
}

export default function useHistoryTravel<T>(initialValue?: T, maxLength = 0) {
  const [history, setHistory] = useState<IData<T | undefined>>({
    present: initialValue,
    past: [],
    future: []
  });
  console.log(history, 'history');
  const { present, past, future } = history;
  const setValue = (target: T) => {
    const _past = [...past, present];
    setHistory({
      present: target,
      past: _past,
      future: []
    });
  };
  const forward = (step = 1) => {
    const index = step - 1;
    const current = future[index];
    setHistory({
      present: current,
      past: [...past, present],
      future: future.splice(index + 1)
    });
  };
  const back = () => {
    const index = past.length - 1;
    const current = past[index];
    const before = past.slice(0, index);
    console.log(present, past, future, 'present, past, future ');
    setHistory({
      present: current,
      past: before,
      future: [present, ...future]
    });
  };

  const go = (step: number) => {
    if (step === 0) {
      return;
    }
    if (step > 0) {
      forward(step);
    } else {
      back();
    }
  };
  const reset = () => {
    console.log('reset');
  };
  return {
    value: present,
    setValue,
    back,
    backLength: past.length,
    forwardLength: future.length,
    forward,
    go,
    reset
  };
}
