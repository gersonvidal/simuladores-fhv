import { DeviceFactory } from "../DeviceFactory";
import { WaterLevelSensor } from "../../sensores/sensor-nivel-de-agua/WaterLevelSensor";
import { ISensor } from "../../interfaces/ISensor";

class WaterLevelSensorFactory extends DeviceFactory<ISensor> {
  createDevice(): ISensor {
    // TODO: Pasar instancia de cliente MQTT al constructor
    return new WaterLevelSensor();
  }
}