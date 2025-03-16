import { Sensor } from "../sensor";
import { MqttClient } from "../../core/mqtt/MqttClient"

export class TemperatureSensor extends Sensor {
  constructor(mqttClient: MqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "temperature");
  }

  readAndPublishData(): void {
    const temperature = (Math.random() * (36 - 22) + 22).toFixed(2);
    console.log(`Temperatura medida: ${temperature}°C`);
    this.mqttClient.publish(this.topic, JSON.stringify({ value: temperature }));
  }
}
