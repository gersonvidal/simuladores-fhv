import { MqttClient } from "./mqttClient";

export class MqttClientImplementation extends MqttClient {
  connect(): void {}
  publish(topic: string, message: string): void {}
  subscribe(topic: string, callback: (message: string) => void): void {}
  disconnect(): void {}
}
