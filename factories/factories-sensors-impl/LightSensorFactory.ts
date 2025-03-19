import { DeviceFactory } from "../DeviceFactory";
import { Sensor } from "../../sensors/Sensor.js";
import { mqttClient } from "../../core/mqtt/MqttClient";
import { LightSensor } from "../../sensors/light-sensor/LightSensor";

export class LightSensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    return new LightSensor(mqttClient, greenhouseId);
  }
}
