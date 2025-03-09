import { DeviceFactory } from "../DeviceFactory";
import { HumiditySensor } from "../../sensores/sensor-humedad/HumiditySensor";
import { ISensor } from "../../interfaces/ISensor";

class HumiditySensorFactory extends DeviceFactory<ISensor> {
  createDevice(): ISensor {
    // TODO: Pasar instancia de cliente MQTT al constructor
    return new HumiditySensor();
  }
}