import { HumiditySensorFactory } from "./factories/factories-sensors-impl/HumiditySensorFactory.js";
import { TemperatureSensorFactory } from "./factories/factories-sensors-impl/TemperatureSensorFactory.js";
import { WaterLevelSensorFactory } from "./factories/factories-sensors-impl/WaterLevelSensorFactory.js";
import { LightSensorFactory } from "./factories/factories-sensors-impl/LightSensorFactory.js";

import { SprinklerActuatorFactory } from "./factories/factories-actuators-impl/SprinklerActuatorFactory.js";
import { NotificationActuatorFactory } from "./factories/factories-actuators-impl/NotificationActuatorFactory.js";
import { WaterPumpActuatorFactory } from "./factories/factories-actuators-impl/WaterPumpActuatorFactory.js";
import { LightActuatorFactory } from "./factories/factories-actuators-impl/LightActuatorFactory.js";
import { FanActuatorFactory } from "./factories/factories-actuators-impl/FanActuatorFactory.js";

import { Logs } from "./src/utils/Logs.js";

// Instancias base
const logger = new Logs();
const greenhouseId = "greenhouse-1";
const brokerUrl = "mqtt://localhost:1883";

// Crear fábricas de actuadores
const sprinklerActuatorFactory = new SprinklerActuatorFactory();
const notificationActuatorFactory = new NotificationActuatorFactory();
const waterPumpActuatorFactory = new WaterPumpActuatorFactory();
const lightActuatorFactory = new LightActuatorFactory();
const fanActuatorFactory = new FanActuatorFactory();

// Crear instancias de actuadores
const sprinklerActuator = sprinklerActuatorFactory.createDevice(
  greenhouseId,
  brokerUrl
);
const notificationActuator = notificationActuatorFactory.createDevice(
  greenhouseId,
  brokerUrl
);
const waterPumpActuator = waterPumpActuatorFactory.createDevice(
  greenhouseId,
  brokerUrl
);
const lightActuator = lightActuatorFactory.createDevice(
  greenhouseId,
  brokerUrl
);

const fanActuator = fanActuatorFactory.createDevice(
  greenhouseId,
  brokerUrl
);

// Crear fábricas de sensores
const humiditySensorFactory = new HumiditySensorFactory();
const temperatureSensorFactory = new TemperatureSensorFactory();
const waterLevelSensorFactory = new WaterLevelSensorFactory();
const lightSensorFactory = new LightSensorFactory();

// Crear instancias de sensores
const humiditySensor = humiditySensorFactory.createDevice(
  greenhouseId,
  brokerUrl
);
const temperatureSensor = temperatureSensorFactory.createDevice(
  greenhouseId,
  brokerUrl
);
const waterLevelSensor = waterLevelSensorFactory.createDevice(
  greenhouseId,
  brokerUrl
);

const lightSensor = lightSensorFactory.createDevice(
  greenhouseId, 
  brokerUrl
);

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