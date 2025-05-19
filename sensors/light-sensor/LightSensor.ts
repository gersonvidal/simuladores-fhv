import { Sensor } from "../Sensor.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient"; // Usa la interfaz correcta


export class LightSensor extends Sensor {
  private luminosity: number = Math.random() * 1000; // Estado interno

  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "light");
  }

  readAndPublishData(): void {
    // Si el actuador de luz está encendido, la luminosidad aumenta
    if (this.isActuatorActive("light")) {
      if (this.luminosity < 800) {
        this.luminosity += 50;
      } else {
        this.luminosity += Math.random() * 10 - 5; // Oscila suavemente
      }
    } else {
      this.luminosity = Math.max(0, this.luminosity - Math.random() * 15);
    }

    console.log(`💡 Luminosidad: ${this.luminosity.toFixed(2)} lux`);
    this.mqttClient.publish(this.topic, JSON.stringify({ value: this.luminosity.toFixed(2) }));
  }
}