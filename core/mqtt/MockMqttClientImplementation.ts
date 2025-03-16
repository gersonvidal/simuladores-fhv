import { MqttClient } from "./MqttClient";

export class MockMqttClientImplementation extends MqttClient {
  connect(): void {}

  publish(topic: string, message: string): void {
    console.log(`Publicando en ${topic}: ${message}`);
  }

  subscribe(topic: string, callback: (message: string) => void): void {}

  disconnect(): void {}
}
