// src/factories/LightSensorFactory.ts
import { DeviceFactory } from "../DeviceFactory.js";
import { Sensor } from "../../sensors/Sensor.js";
import { LightSensor } from "../../sensors/light-sensor/LightSensor.js";
import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation.js";  // Importa la implementación
import { IMqttClient } from "../../core/mqtt/IMqttClient.js";  // Importa la interfaz

export class LightSensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string, brokerUrl: string): Sensor {
    // Instancia mqttClient
    const mqttClient: IMqttClient = new MqttClientImplementation(brokerUrl);

    // Pasa la instancia a los sensores
    return new LightSensor(mqttClient, greenhouseId);
  }
}
