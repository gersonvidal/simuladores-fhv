// src/factories/HumiditySensorFactory.ts
import { DeviceFactory } from "../DeviceFactory";
import { Sensor } from "../../sensors/Sensor";
import { HumiditySensor } from "../../sensors/humidity-sensor/HumiditySensor";
import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation";  // Importa la implementación concreta
import { IMqttClient } from "../../core/mqtt/IMqttClient";  // Importa la interfaz

export class HumiditySensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    // Crea una instancia de mqttClient usando la implementación de MqttClient
    const mqttClient: IMqttClient = new MqttClientImplementation("mqtt://localhost:1883");

    // Aquí pasamos la instancia de mqttClient al constructor del sensor
    return new HumiditySensor(mqttClient, greenhouseId, "humidity");
  }
}
