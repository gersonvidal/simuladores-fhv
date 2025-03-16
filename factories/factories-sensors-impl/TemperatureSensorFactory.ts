import { DeviceFactory } from "../DeviceFactory";
import { Sensor } from "../../sensors/Sensor";
import { MockMqttClientImplementation } from "../../core/mqtt/MockMqttClientImplementation";
import { TemperatureSensor } from "../../sensors/temperature-sensor/TemperatureSensor";

export class TemperatureSensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    return new TemperatureSensor(new MockMqttClientImplementation(), greenhouseId);
  }
}
