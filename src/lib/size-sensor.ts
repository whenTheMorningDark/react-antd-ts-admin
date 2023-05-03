

import { elementType } from './type';
import { getSensor } from './sensorPool';

export const bind = (element: elementType, cb: any) => {
  const sensor = getSensor(element);
  sensor.bind(cb);
};

export const clear = () => {
  console.log('clear');
};