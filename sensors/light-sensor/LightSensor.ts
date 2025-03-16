import { Sensor } from "../sensor";
import { MqttClient } from "../../core/mqtt/MqttClient"

export class LightSensor extends Sensor {
  constructor(mqttClient: MqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "light");
  }

  readAndPublishData(): void {
    const luminosity = Math.floor(Math.random() * 1000); // Medida en lux
    console.log(`Luminosidad: ${luminosity} lux`);
    this.mqttClient.publish(this.topic, JSON.stringify({ value: luminosity }));
  }
}
