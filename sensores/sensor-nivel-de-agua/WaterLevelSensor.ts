import { ISensor } from "../../interfaces/ISensor";

export class WaterLevelSensor implements ISensor {
  private topic: string = "sensors/waterLevel";

  // TODO: constructor(private mqttClient: IMQTTClient) {}

  readData(): void {
    const level = Math.floor(Math.random() * 101); // Nivel entre 0 y 100
    console.log(`Nivel de agua: ${level}%`);
    // TODO: this.mqttClient.publish(this.topic, JSON.stringify({ value: level }));
  }

  getTopic(): string {
    return this.topic;
  }
}
