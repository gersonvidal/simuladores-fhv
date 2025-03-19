
export interface IMqttClient {
    publish(topic: string, message: string): void;
    subscribe(topic: string, callback: (message: string) => void): void;
    disconnect(): void;
}