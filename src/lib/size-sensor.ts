

import { elementType, callBackType } from './type';
import { getSensor, removeSensor } from './sensorPool';

export const bind = (element: elementType, cb: callBackType) => {
  const sensor = getSensor(element);
  sensor.bind(cb);
  return () => {
    sensor.unbind(cb);
  };
};

export const clear = (element: elementType) => {
  const sensor = getSensor(element);
  removeSensor(sensor);
};
