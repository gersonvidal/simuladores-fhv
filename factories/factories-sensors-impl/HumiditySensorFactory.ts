// src/factories/HumiditySensorFactory.ts
import { DeviceFactory } from "../DeviceFactory.js";
import { Sensor } from "../../sensors/Sensor.js";
import { HumiditySensor } from "../../sensors/humidity-sensor/HumiditySensor.js";
import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation.js";  // Importa la implementación concreta
import { IMqttClient } from "../../core/mqtt/IMqttClient.js";  // Importa la interfaz

export class HumiditySensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string, brokerUrl: string): Sensor {
    // Crea una instancia de mqttClient usando la implementación de MqttClient
    const mqttClient: IMqttClient = new MqttClientImplementation(brokerUrl);

    // Aquí pasamos la instancia de mqttClient al constructor del sensor
    return new HumiditySensor(mqttClient, greenhouseId);
  }
}
