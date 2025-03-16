import { DeviceFactory } from "../DeviceFactory";
import { Sensor } from "../../sensors/Sensor";
import { MockMqttClientImplementation } from "../../core/mqtt/MockMqttClientImplementation";
import { LightSensor } from "../../sensors/light-sensor/LightSensor";

export class LightSensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    return new LightSensor(new MockMqttClientImplementation(), greenhouseId);
  }
}
