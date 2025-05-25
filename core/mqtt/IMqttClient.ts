// core/mqtt/IMqttClient.ts
export interface IMqttClient {
  connect(): void;
  publish(topic: string, message: string): void;
  publish(topic: string, message: string, options: { retain: boolean }): void;
  subscribe(topic: string, callback: (message: string) => void): void;
  disconnect(): void;
}
