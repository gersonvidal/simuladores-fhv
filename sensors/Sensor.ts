// src/sensors/Sensor.ts
import { IMqttClient } from "../core/mqtt/MqttClient"; // Importa la interfaz IMqttClient
import { Device } from "../core/device/Device.js";

export abstract class Sensor extends Device {
  protected value: number = 0;

  constructor(
    mqttClient: IMqttClient,  // Usa la interfaz IMqttClient en vez de la instancia directamente
    greenhouseId: string,
    sensorType: string
  ) {
    super(mqttClient, greenhouseId, `greenhouse/${greenhouseId}/sensor/${sensorType}`);
  }

  readAndPublishData(): void {}

  getValue(): number {
    return this.value;
  }
}
