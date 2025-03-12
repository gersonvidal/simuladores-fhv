// interfaces/IMQTTClient.ts
export interface IMQTTClient {
    connect(): void;
    disconnect(): void;
    publish(topic: string, message: string): void;
    subscribe(topic: string, callback: (message: string) => void): void;
}