import { DeviceFactory } from "../DeviceFactory";
import { Sensor } from "../../sensors/Sensor";
import { MockMqttClientImplementation } from "../../core/mqtt/MockMqttClientImplementation";
import { WaterLevelSensor } from "../../sensors/water-level-sensor/WaterLevelSensor";

export class WaterLevelSensorFactory implements DeviceFactory<Sensor> {
  createDevice(greenhouseId: string): Sensor {
    return new WaterLevelSensor(new MockMqttClientImplementation(), greenhouseId);
  }
}
