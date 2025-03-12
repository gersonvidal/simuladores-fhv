import { DeviceFactory } from "../DeviceFactory";
import { TemperatureSensor } from "../../sensores/sensor-temperatura/TemperatureSensor";
import { ISensor } from "../../interfaces/ISensor";
import { IMQTTClient } from "../../interfaces/IMQTTClient";

class TemperatureSensorFactory extends DeviceFactory<ISensor> {
  constructor(private mqttClient: IMQTTClient) {
    super();
  }

  createDevice(): ISensor {
    return new TemperatureSensor(this.mqttClient); // Pasa el cliente MQTT
  }
}