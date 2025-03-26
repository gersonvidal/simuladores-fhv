import { HumiditySensor } from "./sensors/humidity-sensor/HumiditySensor.js";
import { TemperatureSensor } from "./sensors/temperature-sensor/TemperatureSensor.js";
import { WaterLevelSensor } from "./sensors/water-level-sensor/WaterLevelSensor.js";
import { LightSensor } from "./sensors/light-sensor/LightSensor.js";
import { MqttClientImplementation } from "./core/mqtt/MqttClientImplementation.js";
import { Logs } from "./src/utils/Logs.js";
import { LightActuator } from "./actuators/light-actuator/LightActuator.js";
import { SprinklerActuator } from "./actuators/sprinkler-actuator/SprinklerActuator.js";
import { DecisionManagerImplementation } from "./managers/DecisionManagerImplementation.js";

// Crear una instancia del Logger
const logger = new Logs();

// Crear una instancia del cliente MQTT real
const mqttClient = new MqttClientImplementation("mqtt://localhost:1883");

// Definir ID del invernadero
const greenhouseId = "greenhouse-1";

// Crear instancias de sensores
const temperatureSensor = new TemperatureSensor(mqttClient, greenhouseId);
const humiditySensor = new HumiditySensor(mqttClient, greenhouseId, "any");
const waterLevelSensor = new WaterLevelSensor(mqttClient, greenhouseId);
const lightSensor = new LightSensor(mqttClient, greenhouseId);

// Crear instancias de actuadores
const lightActuator = new LightActuator(mqttClient, greenhouseId);
const sprinklerActuator = new SprinklerActuator(mqttClient, greenhouseId);

// Crear instancia del Decision Manager y pasarle el mqttClient
const decisionManager = new DecisionManagerImplementation(mqttClient);
decisionManager.subscribeToSensors();

// Función para ejecutar la simulación
function runSimulation(): void {
    const now = new Date();
    console.log("Fecha y Hora: " + now.toString());

    // Leer datos de los sensores y publicarlos
    temperatureSensor.readAndPublishData();
    humiditySensor.readAndPublishData();
    waterLevelSensor.readAndPublishData();
    lightSensor.readAndPublishData();

    console.log("---------------------------------");
}

// Iniciar la simulación cada 2.5 segundos
const intervalId = setInterval(runSimulation, 2500);

// Mostrar el historial de eventos cada 10 segundos
setInterval(() => {
    logger.showLogs();
}, 10000);
