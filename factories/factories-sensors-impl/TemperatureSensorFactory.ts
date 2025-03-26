// src/factories/TemperatureSensorFactory.ts
import { DeviceFactory } from "../DeviceFactory";
import { Sensor } from "../../sensors/Sensor.js";
import { TemperatureSensor } from "../../sensors/temperature-sensor/TemperatureSensor";
import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation";  // Importa la implementación
import { IMqttClient } from "../../core/mqtt/IMqttClient";  // Importa la interfaz

export class TemperatureSensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    // Instancia mqttClient
    const mqttClient: IMqttClient = new MqttClientImplementation("mqtt://localhost:1883");

    // Pasa la instancia a los sensores
    return new TemperatureSensor(mqttClient, greenhouseId, "temperature");
  }
}
