// src/factories/WaterLevelSensorFactory.ts
import { DeviceFactory } from "../DeviceFactory";
import { Sensor } from "../../sensors/Sensor.js";
import { WaterLevelSensor } from "../../sensors/water-level-sensor/WaterLevelSensor";
import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation";  // Importa la implementación
import { IMqttClient } from "../../core/mqtt/IMqttClient";  // Importa la interfaz

export class WaterLevelSensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    // Instancia mqttClient
    const mqttClient: IMqttClient = new MqttClientImplementation("mqtt://localhost:1883");

    // Pasa la instancia a los sensores
    return new WaterLevelSensor(mqttClient, greenhouseId, "water-level");
  }
}
