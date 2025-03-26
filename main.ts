//main.ts
import { HumiditySensor } from "./sensors/humidity-sensor/HumiditySensor.js";
import { TemperatureSensor } from "./sensors/temperature-sensor/TemperatureSensor.js";
import { WaterLevelSensor } from "./sensors/water-level-sensor/WaterLevelSensor.js";
import { LightSensor } from "./sensors/light-sensor/LightSensor.js";
import { SprinklerActuator } from "./actuators/sprinkler-actuator/SprinklerActuator.js";
import { NotificationActuator } from "./actuators/notification-actuator/NotificationActuator.js";
import { WaterPumpActuator } from "./actuators/water-pump-actuator/WaterPumpActuator.js";
import { LightActuator } from "./actuators/light-actuator/LightActuator.js";
import { MqttClientImplementation } from "./core/mqtt/MqttClientImplementation.js"; // Cliente MQTT real
import { Logs } from "./src/utils/Logs.js";

// Crear una instancia del Logger
const logger = new Logs();

// Crear una instancia del cliente MQTT real
const mqttClient = new MqttClientImplementation("mqtt://localhost:1883");

// Definir ID del invernadero
const greenhouseId = "greenhouse-1";

// Crear instancias de sensores
const humiditySensor = new HumiditySensor(mqttClient, greenhouseId, "humidity");
const temperatureSensor = new TemperatureSensor(mqttClient, greenhouseId, "temperature");
const waterLevelSensor = new WaterLevelSensor(mqttClient, greenhouseId, "water_level");
const lightSensor = new LightSensor(mqttClient, greenhouseId, "light");

// Crear instancias de sensores
const sprinklerActuator = new SprinklerActuator(mqttClient, greenhouseId);
const notificationActuator = new NotificationActuator(mqttClient, greenhouseId);
const waterPumpActuator = new WaterPumpActuator(mqttClient, greenhouseId);
const lightActuator = new LightActuator(mqttClient, greenhouseId);

// Función para ejecutar la simulación
// function runSimulation(): void {
//   const now = new Date();
//   console.log("Fecha y Hora: " + now.toString());

//    Leer datos de los sensores y publicarlos
//   temperatureSensor.readAndPublishData();
//   humiditySensor.readAndPublishData();
//   waterLevelSensor.readAndPublishData();
//   lightSensor.readAndPublishData();

//   console.log("---------------------------------");
// }

// Iniciar la simulación cada 2.5 segundos
// const intervalId = setInterval(runSimulation, 2500);

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
