import { ISensor } from "../../interfaces/ISensor";
import { IMQTTClient } from "../../interfaces/IMQTTClient";

export class WaterLevelSensor implements ISensor {
    private topic: string = "sensors/waterLevel";

    constructor(private mqttClient: IMQTTClient) {}

    readData(): void {
        const level = Math.floor(Math.random() * 101); // Nivel entre 0 y 100
        console.log(`Nivel de agua: ${level}%`);
        this.mqttClient.publish(this.topic, JSON.stringify({ value: level }));
    }

    getTopic(): string {
        return this.topic;
    }
}