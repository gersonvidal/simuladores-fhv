import { Device } from "../core/device/Device.js";
import { IMqttClient } from "../core/mqtt/IMqttClient";

export abstract class Actuator extends Device {
  private sensorTopic: string;

  constructor(
    mqttClient: IMqttClient,
    greenhouseId: string,
    actuatorType: string,
    sensorType: string
  ) {
    super(
      mqttClient,
      greenhouseId,
      `greenhouse/${greenhouseId}/actuator/${actuatorType}`
    );
    this.sensorTopic = `greenhouse/${greenhouseId}/sensor/${sensorType}`;
    this.subscribeToSensorTopic();
  }

  private subscribeToSensorTopic(): void {
    this.mqttClient.subscribe(this.sensorTopic, (message: string) => {
      this.handleSensorData(message.toString());
    });
  }

  protected abstract handleSensorData(message: string): void;

  abstract executeAction(command: string): void;

}
