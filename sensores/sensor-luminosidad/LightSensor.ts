import { ISensor } from "../../interfaces/ISensor";

export class LightSensor implements ISensor {
  private topic: string = "sensors/light";

  // TODO: constructor(private mqttClient: IMQTTClient) {}

  readData(): void {
    const luminosity = Math.floor(Math.random() * 1000); // Medida en lux
    console.log(`Luminosidad: ${luminosity} lux`);
    // TODO: this.mqttClient.publish(this.topic, JSON.stringify({ value: luminosity }));
  }

  getTopic(): string {
    return this.topic;
  }
}
