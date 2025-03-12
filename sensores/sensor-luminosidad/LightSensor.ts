import { ISensor } from "../../interfaces/ISensor";
import { IMQTTClient } from "../../interfaces/IMQTTClient";

export class LightSensor implements ISensor {
    private topic: string = "sensors/light";

    constructor(private mqttClient: IMQTTClient) {}

    readData(): void {
        const luminosity = Math.floor(Math.random() * 1000); // Medida en lux
        console.log(`Luminosidad: ${luminosity} lux`);
        this.mqttClient.publish(this.topic, JSON.stringify({ value: luminosity }));
    }

    getTopic(): string {
        return this.topic;
    }
}