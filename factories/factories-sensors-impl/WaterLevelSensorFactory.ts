import { DeviceFactory } from "../DeviceFactory";
import { Sensor } from "../../sensors/Sensor.js";
import { mqttClient } from "../../core/mqtt/MqttClient";
import { WaterLevelSensor } from "../../sensors/water-level-sensor/WaterLevelSensor";

export class WaterLevelSensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    return new WaterLevelSensor(mqttClient, greenhouseId);
  }
}
