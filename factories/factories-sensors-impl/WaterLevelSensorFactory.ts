// src/factories/WaterLevelSensorFactory.ts
import { DeviceFactory } from "../DeviceFactory.js";
import { Sensor } from "../../sensors/Sensor.js";
import { WaterLevelSensor } from "../../sensors/water-level-sensor/WaterLevelSensor.js";
import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation.js";  // Importa la implementación
import { IMqttClient } from "../../core/mqtt/IMqttClient.js";  // Importa la interfaz

export class WaterLevelSensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string, brokerUrl: string): Sensor {
    // Instancia mqttClient
    const mqttClient: IMqttClient = new MqttClientImplementation(brokerUrl);

    // Pasa la instancia a los sensores
    return new WaterLevelSensor(mqttClient, greenhouseId);
  }
}
