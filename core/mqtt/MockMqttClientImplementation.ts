import { IMqttClient } from "./IMqttClient";

export class MockMqttClientImplementation implements IMqttClient {
    private brokerUrl: string;

    constructor(brokerUrl: string) {
        this.brokerUrl = brokerUrl;
    }

    connect(): void {
        console.log("Mock: Conectado al servidor MQTT");
    }

    publish(topic: string, message: string): void {
        console.log(`Mock: Publicando en ${topic}: ${message}`);
    }

    subscribe(topic: string, callback: (message: string) => void): void {
        console.log(`Mock: Suscrito a ${topic}`);
        // Simula la recepción de un mensaje
        setTimeout(() => {
            callback("Mock message");
        }, 1000);
    }

    disconnect(): void {
        console.log("Mock: Desconectado del servidor MQTT");
    }
}
