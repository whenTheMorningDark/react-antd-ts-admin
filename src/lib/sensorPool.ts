
import { elementType } from './type';
import { SizeSensorId } from './constant';
import { createSensor } from './createSensor';

export type sensorType = ReturnType<typeof createSensor>

interface iSensors {
  [key: string]: sensorType;
}
const Sensors: iSensors = {};

const id = () => `${new Date().getTime()}`;

export const getSensor = (element: elementType) => {
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

export const removeSensor = (sensor: sensorType) => {
  const sensorId = sensor.element.getAttribute(SizeSensorId);
  sensor.element.removeAttribute(SizeSensorId);
  sensor.destroy();
  if (sensorId && Sensors[sensorId]) {
    delete Sensors[sensorId];
  }
};