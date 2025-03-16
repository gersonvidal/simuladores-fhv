import { Sensor } from "../sensor";
import { MqttClient } from "../../core/mqtt/MqttClient"

export class WaterLevelSensor extends Sensor {
  constructor(mqttClient: MqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "water_level");
  }

  readAndPublishData(): void {
    const level = Math.floor(Math.random() * 101); // Nivel entre 0 y 100
    console.log(`Nivel de agua: ${level}%`);
    this.mqttClient.publish(this.topic, JSON.stringify({ value: level }));
  }

}
