import { DeviceFactory } from "../DeviceFactory";
import { LightSensor } from "../../sensores/sensor-luminosidad/LightSensor";
import { ISensor } from "../../interfaces/ISensor";
import { IMQTTClient } from "../../interfaces/IMQTTClient";

class LightSensorFactory extends DeviceFactory<ISensor> {
  constructor(private mqttClient: IMQTTClient) {
    super();
  }

  createDevice(): ISensor {
    return new LightSensor(this.mqttClient); // Pasa el cliente MQTT
  }
}