import { useMemo, useRef } from 'react';

type noop = (this: any, ...args: any[]) => any;
// eslint-disable-next-line max-len
type PickFunction<T extends noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;
const useMemoizedFn = <T extends noop>(fn: T) => {
  const fnRef = useRef<T>(fn);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<PickFunction<T>>();
  if (!memoizedFn.current) {
    // eslint-disable-next-line func-names
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current as T;
};
export { useMemoizedFn };
