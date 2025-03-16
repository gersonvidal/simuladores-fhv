import { Sensor } from "../sensor";
import { MqttClient } from "../../core/mqtt/MqttClient"

export class HumiditySensor extends Sensor {
  constructor(mqttClient: MqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "humidity");
  }

  readAndPublishData(): void {
    const humidity = (Math.random() * (90 - 65) + 65).toFixed(2);
    console.log(`Humedad medida: ${humidity}%`);
    this.mqttClient.publish(this.topic, JSON.stringify({ value: humidity }));
  }
}
