import { ISensor } from "../../interfaces/ISensor";

export class HumiditySensor implements ISensor {
    private topic: string = "sensors/humidity";

    // TODO: constructor(private mqttClient: IMQTTClient) {}

    readData(): void {
        const humidity = (Math.random() * (90 - 65) + 65).toFixed(2);
        console.log(`Humedad medida: ${humidity}%`);
        // TODO: this.mqttClient.publish(this.topic, JSON.stringify({ value: humidity }));
    }

    getTopic(): string {
        return this.topic;
    }
}