// src/factories/LightSensorFactory.ts
import { DeviceFactory } from "../DeviceFactory";
import { Sensor } from "../../sensors/Sensor.js";
import { LightSensor } from "../../sensors/light-sensor/LightSensor";
import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation";  // Importa la implementación
import { IMqttClient } from "../../core/mqtt/IMqttClient";  // Importa la interfaz

export class LightSensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    // Instancia mqttClient
    const mqttClient: IMqttClient = new MqttClientImplementation("mqtt://localhost:1883");

    // Pasa la instancia a los sensores
    return new LightSensor(mqttClient, greenhouseId, "light");
  }
}
