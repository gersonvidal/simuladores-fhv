import { DeviceFactory } from "../DeviceFactory";
import { LightSensor } from "../../sensores/sensor-luminosidad/LightSensor";
import { ISensor } from "../../interfaces/ISensor";

class LightSensorFactory extends DeviceFactory<ISensor> {
  createDevice(): ISensor {
    // TODO: Pasar instancia de cliente MQTT al constructor
    return new LightSensor();
  }
}