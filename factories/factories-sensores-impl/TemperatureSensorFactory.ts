import { DeviceFactory } from "../DeviceFactory";
import { TemperatureSensor } from "../../sensores/sensor-temperatura/TemperatureSensor";
import { ISensor } from "../../interfaces/ISensor";

class TemperatureSensorFactory extends DeviceFactory<ISensor> {
  createDevice(): ISensor {
    // TODO: Pasar instancia de cliente MQTT al constructor
    return new TemperatureSensor();
  }
}