// src/factories/TemperatureSensorFactory.ts
import { DeviceFactory } from "../DeviceFactory.js";
import { Sensor } from "../../sensors/Sensor.js";
import { TemperatureSensor } from "../../sensors/temperature-sensor/TemperatureSensor.js";
import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation.js";  // Importa la implementación
import { IMqttClient } from "../../core/mqtt/IMqttClient.js";  // Importa la interfaz

export class TemperatureSensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    // Instancia mqttClient
    const mqttClient: IMqttClient = new MqttClientImplementation("mqtt://localhost:1883");

    // Pasa la instancia a los sensores
    return new TemperatureSensor(mqttClient, greenhouseId);
  }
}
