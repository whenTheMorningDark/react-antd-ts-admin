
import { elementType } from './type';
import { SizeSensorId } from './constant';
import { createSensor } from './createSensor';

interface iSensors {
  [key: string]: any;
}
const Sensors: iSensors = {};

const id = () => `${new Date().getTime()}`;

export const getSensor = (element: elementType) => {
  console.log(element);
  const sensorId = element.getAttribute(SizeSensorId);
  if (sensorId && Sensors[sensorId]) {
    return Sensors[sensorId];
  }
  const newId = id();
  element.setAttribute(SizeSensorId, newId);
  const sensor = createSensor(element);
  Sensors[newId] = sensor;
  return sensor;
};