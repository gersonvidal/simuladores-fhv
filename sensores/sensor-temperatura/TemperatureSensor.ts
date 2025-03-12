import { ISensor } from "../../interfaces/ISensor";
import { IMQTTClient } from "../../interfaces/IMQTTClient";

export class TemperatureSensor implements ISensor {
    private topic: string = "sensors/temperature";

    constructor(private mqttClient: IMQTTClient) {}

    readData(): void {
        const temperature = (Math.random() * (36 - 22) + 22).toFixed(2);
        console.log(`Temperatura medida: ${temperature}°C`);
        this.mqttClient.publish(this.topic, JSON.stringify({ value: temperature }));
    }

    getTopic(): string {
        return this.topic;
    }
}