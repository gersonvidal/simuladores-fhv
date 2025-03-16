import { Device } from "../core/device/Device";

export abstract class Actuator extends Device {
  constructor(
    mqttClient: MqttClient,
    greenhouseId: string,
    actuatorType: string
  ) {
    super(
      mqttClient,
      greenhouseId,
      `greenhouse/${greenhouseId}/actuator/${actuatorType}`
    );
    this.subscribeToTopic();
  }

  protected subscribeToTopic(): void {
    this.mqttClient.subscribe(this.getTopic(), (message) => {
      this.executeAction(message);
    });
  }

  executeAction(command: string): void {}
}
