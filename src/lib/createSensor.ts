import { elementType } from './type';

const debounce = (fn: any, delay = 60) => {
  let timer: any = null;

  return (...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};


export const createSensor = (element: elementType) => {
  let sensor: any;
  const listeners: any[] = [];
  const resizeListener = debounce(() => {
    // trigger all
    listeners.forEach(listener => {
      listener(element);
    });
  });
  const newSensor = () => {
    const s = new ResizeObserver(resizeListener);
    // listen element
    s.observe(element);
    return s;
  };
  const bind = (cb: any) => {
    if (!sensor) {
      sensor = newSensor();
    }
    if (listeners.indexOf(cb) === -1) {
      listeners.push(cb);
    }
  };
  return {
    bind
  };
};