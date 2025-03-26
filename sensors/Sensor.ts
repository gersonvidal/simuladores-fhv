// src/sensors/Sensor.ts
import { IMqttClient } from "../core/mqtt/IMqttClient"; // Importa la interfaz IMqttClient
import { Device } from "../core/device/Device.js";

export abstract class Sensor extends Device {
  protected value: number = 0;

  constructor(
    mqttClient: IMqttClient,
    greenhouseId: string,
    sensorType: string
  ) {
    super(mqttClient, greenhouseId, `greenhouse/${greenhouseId}/sensor/${sensorType}`);
  }

  readAndPublishData(): void {}

  getValue(): number {
    return this.value;
  }

  protected isActuatorActive(actuatorType: string): boolean {
    return this.mqttClient.isActuatorOn(`greenhouse/${this.greenhouseId}/actuator/${actuatorType}`);
  }
}
