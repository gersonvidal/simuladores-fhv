import { Sensor } from "../Sensor.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient.js"; // Usa la interfaz correcta

export class TemperatureSensor extends Sensor {
  private temperature: number = Math.random() * (36 - 22) + 22; // Estado interno

  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "temperature"); // Llamada al constructor de la clase base
  }

  readAndPublishData(): void {

    const lightOn = this.isActuatorActive("light");
    const sprinklerOn = this.isActuatorActive("sprinkler");
    
    if (sprinklerOn) {
      this.temperature = Math.max(22, this.temperature - 0.5);
    } else if (lightOn) {
      if (this.temperature < 30) {
        this.temperature += 0.5;
      } else {
        this.temperature += Math.random() * 0.3 - 0.15; // leve variación
      }
    } else {
      this.temperature = Math.max(22, this.temperature - Math.random() * 0.2);
    }

    console.log(`☀️ Temperatura medida: ${this.temperature.toFixed(2)}°C`);
    this.mqttClient.publish(this.topic, JSON.stringify({ value: this.temperature.toFixed(2) }));
  }
}