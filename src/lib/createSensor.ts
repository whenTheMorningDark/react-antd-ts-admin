import ResizeObserver from 'resize-observer-polyfill';
import { elementType, callBackType } from './type';

const debounce = <T extends unknown[]>(fn: (...args: T) => void, delay = 60) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};


export const createSensor = (element: elementType) => {
  let sensor: ResizeObserver | undefined;
  let listeners: callBackType[] = [];
  const resizeListener = debounce(() => {
    listeners.forEach(listener => {
      listener(element);
    });
  });
  const newSensor = () => {
    const s = new ResizeObserver(resizeListener);
    s.observe(element);
    return s;
  };
  const bind = (cb: callBackType) => {
    if (!sensor) {
      sensor = newSensor();
    }
    if (listeners.indexOf(cb) === -1) {
      listeners.push(cb);
    }
  };
  const destroy = () => {
    if (sensor) {
      sensor.disconnect();
    }
    listeners = [];
    sensor = undefined;
  };
  const unbind = (cb: callBackType) => {
    const idx = listeners.indexOf(cb);
    if (idx !== -1) {
      listeners.splice(idx, 1);
    }
    if (listeners.length === 0 && sensor) {
      destroy();
    }
  };
  return {
    bind,
    unbind,
    destroy,
    element
  };
};