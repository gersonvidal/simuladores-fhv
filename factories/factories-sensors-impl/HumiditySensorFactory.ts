// src/factories/HumiditySensorFactory.ts
import { DeviceFactory } from "../DeviceFactory";
import { Sensor } from "../../sensors/Sensor";
import { HumiditySensor } from "../../sensors/humidity-sensor/HumiditySensor";
import { mqttClient } from "../../core/mqtt/MqttClient"; // Aquí importas la instancia de mqttClient

export class HumiditySensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    return new HumiditySensor(mqttClient, greenhouseId);
  }
}
