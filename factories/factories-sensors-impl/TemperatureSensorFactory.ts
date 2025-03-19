import { DeviceFactory } from "../DeviceFactory";
import { Sensor } from "../../sensors/Sensor.js";
import { mqttClient } from "../../core/mqtt/MqttClient";
import { TemperatureSensor } from "../../sensors/temperature-sensor/TemperatureSensor";

export class TemperatureSensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    return new TemperatureSensor(mqttClient, greenhouseId);
  }
}
