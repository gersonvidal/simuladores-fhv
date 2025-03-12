import { DeviceFactory } from "../DeviceFactory";
import { WaterLevelSensor } from "../../sensores/sensor-nivel-de-agua/WaterLevelSensor";
import { ISensor } from "../../interfaces/ISensor";
import { IMQTTClient } from "../../interfaces/IMQTTClient";

class WaterLevelSensorFactory extends DeviceFactory<ISensor> {
  constructor(private mqttClient: IMQTTClient) {
    super();
  }

  createDevice(): ISensor {
    return new WaterLevelSensor(this.mqttClient); // Pasa el cliente MQTT
  }
}