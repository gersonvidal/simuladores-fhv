import mqtt, { MqttClient as MqttLibClient } from "mqtt";
import { IMqttClient } from "./IMqttClient";

export class MqttClientImplementation implements IMqttClient {
    private client: MqttLibClient;
    private brokerUrl: string;

    constructor(brokerUrl: string) {
        this.brokerUrl = brokerUrl;
        this.client = mqtt.connect(this.brokerUrl);
    }

    connect(): void {
        this.client.on("connect", () => {
            console.log("Conectado al servidor MQTT");
        });

        this.client.on("error", (error: Error) => {
            console.error("Error de conexión MQTT:", error);
        });
    }

    publish(topic: string, message: string): void {
        this.client.publish(topic, message, (error?: Error) => {
            if (error) {
                console.error(`Error publicando en ${topic}:`, error);
            } else {
                console.log(`Publicado en ${topic}: ${message}`);
            }
        });
    }

    subscribe(topic: string, callback: (message: string) => void): void {
        this.client.subscribe(topic, (error: Error | null) => {
            if (error) {
                console.error(`Error suscribiéndose a ${topic}:`, error);
            } else {
                console.log(`Suscrito a ${topic}`);
            }
        });
    
        this.client.on("message", (receivedTopic: string, message: Buffer) => {
            if (receivedTopic === topic) {
                callback(message.toString());
            }
        });
    }

    disconnect(): void {
        this.client.end();
        console.log("Desconectado del servidor MQTT");
    }
}
