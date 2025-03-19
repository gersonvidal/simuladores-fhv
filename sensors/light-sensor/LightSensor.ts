import { Sensor } from "../Sensor.js";
import { IMqttClient } from "../../core/mqtt/MqttClient"; // Usa la interfaz correcta


export class LightSensor extends Sensor {
  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "light");
  }

  readAndPublishData(): void {
    const luminosity = Math.floor(Math.random() * 1000); // Medida en lux
    console.log(`Luminosidad: ${luminosity} lux`);
    this.mqttClient.publish(this.topic, JSON.stringify({ value: luminosity }));
  }
}
