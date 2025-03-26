// core/mqtt/IMqttClient.ts
export interface IMqttClient {
    connect(): void;
    publish(topic: string, message: string): void;
    subscribe(topic: string, callback: (message: string) => void): void;
    disconnect(): void;
    isActuatorOn(topic: string): boolean;  // Asegúrate de que esta firma esté presente
}
