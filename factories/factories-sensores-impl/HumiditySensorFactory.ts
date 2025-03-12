import { DeviceFactory } from "../DeviceFactory";
import { HumiditySensor } from "../../sensores/sensor-humedad/HumiditySensor";
import { ISensor } from "../../interfaces/ISensor";
import { IMQTTClient } from "../../interfaces/IMQTTClient";

class HumiditySensorFactory extends DeviceFactory<ISensor> {
  constructor(private mqttClient: IMQTTClient) {
    super();
  }

  createDevice(): ISensor {
    return new HumiditySensor(this.mqttClient); // Pasa el cliente MQTT
  }
}