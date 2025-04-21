import { HumiditySensorFactory } from "./factories/factories-sensors-impl/HumiditySensorFactory.js";
import { TemperatureSensorFactory } from "./factories/factories-sensors-impl/TemperatureSensorFactory.js";
import { WaterLevelSensorFactory } from "./factories/factories-sensors-impl/WaterLevelSensorFactory.js";
import { LightSensorFactory } from "./factories/factories-sensors-impl/LightSensorFactory.js";

import { SprinklerActuatorFactory } from "./factories/factories-actuators-impl/SprinklerActuatorFactory.js";
import { NotificationActuatorFactory } from "./factories/factories-actuators-impl/NotificationActuatorFactory.js";
import { WaterPumpActuatorFactory } from "./factories/factories-actuators-impl/WaterPumpActuatorFactory.js";
import { LightActuatorFactory } from "./factories/factories-actuators-impl/LightActuatorFactory.js";

import { Logs } from "./src/utils/Logs.js";

// Instancias base
const logger = new Logs();
const greenhouseId = "greenhouse-1";

// Crear fábricas de sensores
const humiditySensorFactory = new HumiditySensorFactory();
const temperatureSensorFactory = new TemperatureSensorFactory();
const waterLevelSensorFactory = new WaterLevelSensorFactory();
const lightSensorFactory = new LightSensorFactory();

// Crear fábricas de actuadores
const sprinklerActuatorFactory = new SprinklerActuatorFactory();
const notificationActuatorFactory = new NotificationActuatorFactory();
const waterPumpActuatorFactory = new WaterPumpActuatorFactory();
const lightActuatorFactory = new LightActuatorFactory();

// Crear instancias de sensores
const humiditySensor = humiditySensorFactory.createDevice(greenhouseId);
const temperatureSensor = temperatureSensorFactory.createDevice(greenhouseId);
const waterLevelSensor = waterLevelSensorFactory.createDevice(greenhouseId);
const lightSensor = lightSensorFactory.createDevice(greenhouseId);

// Crear instancias de sensores
const sprinklerActuator = sprinklerActuatorFactory.createDevice(greenhouseId);
const notificationActuator = notificationActuatorFactory.createDevice(greenhouseId);
const waterPumpActuator = waterPumpActuatorFactory.createDevice(greenhouseId);
const lightActuator = lightActuatorFactory.createDevice(greenhouseId);

/**
 * Programa la publicación de datos de un sensor a intervalos fijos.
 *
 * @param sensor Objeto que implementa el método readAndPublishData.
 * @param interval Tiempo en milisegundos entre cada publicación.
 * @returns El identificador del intervalo.
 */
function scheduleSensor(
  sensor: { readAndPublishData: () => void },
  interval: number
): NodeJS.Timeout {
  return setInterval(() => {
    sensor.readAndPublishData();
  }, interval);
}

const intervalHumidity = scheduleSensor(humiditySensor, 3500);
const intervalTemperature = scheduleSensor(temperatureSensor, 6000);
const intervalWaterLevel = scheduleSensor(waterLevelSensor, 10000);
const intervalLight = scheduleSensor(lightSensor, 15000);

// Mostrar el historial de eventos cada 10 segundos
setInterval(() => {
  logger.showLogs();
}, 10000);
