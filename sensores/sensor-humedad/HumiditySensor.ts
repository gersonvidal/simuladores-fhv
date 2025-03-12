import { ISensor } from "../../interfaces/ISensor";
import { IMQTTClient } from "../../interfaces/IMQTTClient";

export class HumiditySensor implements ISensor {
    private topic: string = "sensors/humidity";

    constructor(private mqttClient: IMQTTClient) {}

    readData(): void {
        const humidity = (Math.random() * (90 - 65) + 65).toFixed(2);
        console.log(`Humedad medida: ${humidity}%`);
        this.mqttClient.publish(this.topic, JSON.stringify({ value: humidity }));
    }

    getTopic(): string {
        return this.topic;
    }
}