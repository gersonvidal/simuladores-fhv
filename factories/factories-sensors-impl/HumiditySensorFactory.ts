import { DeviceFactory } from "../DeviceFactory";
import { Sensor } from "../../sensors/Sensor";
import { MockMqttClientImplementation } from "../../core/mqtt/MockMqttClientImplementation";
import { HumiditySensor } from "../../sensors/humidity-sensor/HumiditySensor";

export class HumiditySensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    return new HumiditySensor(new MockMqttClientImplementation(), greenhouseId);
  }
}
