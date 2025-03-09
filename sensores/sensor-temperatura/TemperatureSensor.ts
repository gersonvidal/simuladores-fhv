import { ISensor } from "../../interfaces/ISensor";

export class TemperatureSensor implements ISensor {
    private topic: string = "sensors/temperature";
    
    // TODO: constructor(private mqttClient: IMQTTClient) {}

    readData(): void {
        const temperature = (Math.random() * (36 - 22) + 22).toFixed(2);
        console.log(`Temperatura medida: ${temperature}°C`);
        // TODO: this.mqttClient.publish(this.topic, JSON.stringify({ value: temperature }));
    }

    getTopic(): string {
        return this.topic;
    }
}