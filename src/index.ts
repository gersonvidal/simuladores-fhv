import { SprinklerActuator } from "./services/invernadero/actuators/SprinklerActuator";
import { LightActuator } from "./services/invernadero/actuators/LightActuator";
import { WaterPumpActuator } from "./services/invernadero/actuators/WaterPumpActuator";
import { NotificationActuator } from "./services/invernadero/actuators/NotificationActuator";

// Simulación de un cliente MQTT (reemplar después por el real)
const mqttClient = {
    publish: (topic: string, message: string) => {
        console.log(`Publicando en ${topic}: ${message}`);
    },
};

//Instancias de los actuadores
const sprinkler = new SprinklerActuator(mqttClient);
const light = new LightActuator(mqttClient);
const waterPump = new WaterPumpActuator(mqttClient);
const notification = new NotificationActuator(mqttClient);

//Para probar actuadores
sprinkler.executeAction("OFF");
light.executeAction("ON");
waterPump.executeAction("OFF");
notification.executeAction("Alerta: Humedad baja");