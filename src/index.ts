import { SprinklerActuator } from "../actuators/sprinkler-actuator/SprinklerActuator";
import { LightActuator } from "../actuators/light-actuator/LightActuator";
import { WaterPumpActuator } from "../actuators/water-pump-actuator/WaterPumpActuator";
import { NotificationActuator } from "../actuators/notification-actuator/NotificationActuator";
import { IMqttClient } from "../core/mqtt/IMqttClient"; // Usa el cliente MQTT real
import { MqttClientImplementation } from "core/mqtt/MqttClientImplementation";

// Definir el ID del invernadero (ajústalo según sea necesario)

const mqttClient = new MqttClientImplementation("mqtt://localhost:1883");

const greenhouseId = "GH-001";

// Instancias de los actuadores con el cliente MQTT real
const sprinkler = new SprinklerActuator(mqttClient, greenhouseId);
const light = new LightActuator(mqttClient, greenhouseId);
const waterPump = new WaterPumpActuator(mqttClient, greenhouseId);
const notification = new NotificationActuator(mqttClient, greenhouseId);

// Probar actuadores
sprinkler.executeAction("OFF");
light.executeAction("ON");
waterPump.executeAction("OFF");
notification.executeAction("Alerta: Humedad baja");
