import { Device } from "../core/device/Device";

export abstract class Sensor extends Device {
  protected value: number;

  constructor(
    mqttClient: MqttClient,
    greenhouseId: string,
    sensorType: string
  ) {
    super(
      mqttClient,
      greenhouseId,
      `greenhouse/${greenhouseId}/sensor/${sensorType}`
    );
  }

  readAndPublishData(): void {}

  getValue(): number {
    return this.value;
  }
}
