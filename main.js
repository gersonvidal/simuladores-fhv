"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//main.ts
var HumiditySensor_js_1 = require("./sensors/humidity-sensor/HumiditySensor.js");
var TemperatureSensor_js_1 = require("./sensors/temperature-sensor/TemperatureSensor.js");
var WaterLevelSensor_js_1 = require("./sensors/water-level-sensor/WaterLevelSensor.js");
var LightSensor_js_1 = require("./sensors/light-sensor/LightSensor.js");
var SprinklerActuator_js_1 = require("./actuators/sprinkler-actuator/SprinklerActuator.js");
var NotificationActuator_js_1 = require("./actuators/notification-actuator/NotificationActuator.js");
var WaterPumpActuator_js_1 = require("./actuators/water-pump-actuator/WaterPumpActuator.js");
var LightActuator_js_1 = require("./actuators/light-actuator/LightActuator.js");
var MqttClientImplementation_js_1 = require("./core/mqtt/MqttClientImplementation.js"); // Cliente MQTT real
var Logs_js_1 = require("./src/utils/Logs.js");
// Crear una instancia del Logger
var logger = new Logs_js_1.Logs();
// Crear una instancia del cliente MQTT real
var mqttClient = new MqttClientImplementation_js_1.MqttClientImplementation("mqtt://localhost:1883");
// Definir ID del invernadero
var greenhouseId = "greenhouse-1";
// Crear instancias de sensores
var humiditySensor = new HumiditySensor_js_1.HumiditySensor(mqttClient, greenhouseId);
var temperatureSensor = new TemperatureSensor_js_1.TemperatureSensor(mqttClient, greenhouseId);
var waterLevelSensor = new WaterLevelSensor_js_1.WaterLevelSensor(mqttClient, greenhouseId);
var lightSensor = new LightSensor_js_1.LightSensor(mqttClient, greenhouseId);
// Crear instancias de sensores
var sprinklerActuator = new SprinklerActuator_js_1.SprinklerActuator(mqttClient, greenhouseId);
var notificationActuator = new NotificationActuator_js_1.NotificationActuator(mqttClient, greenhouseId);
var waterPumpActuator = new WaterPumpActuator_js_1.WaterPumpActuator(mqttClient, greenhouseId);
var lightActuator = new LightActuator_js_1.LightActuator(mqttClient, greenhouseId);
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
function scheduleSensor(sensor, interval) {
    return setInterval(function () {
        sensor.readAndPublishData();
    }, interval);
}
var intervalHumidity = scheduleSensor(humiditySensor, 3500);
var intervalTemperature = scheduleSensor(temperatureSensor, 6000);
var intervalWaterLevel = scheduleSensor(waterLevelSensor, 10000);
var intervalLight = scheduleSensor(lightSensor, 15000);
// Mostrar el historial de eventos cada 10 segundos
setInterval(function () {
    logger.showLogs();
}, 10000);
