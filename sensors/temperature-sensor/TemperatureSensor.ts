import { Sensor } from "../Sensor.js";
import { IMqttClient } from "../../core/mqtt/MqttClient"; // Usa la interfaz correcta

export class TemperatureSensor extends Sensor {
  private temperature: number = Math.random() * (36 - 22) + 22; // Estado interno

  readAndPublishData(): void {
    // Si el aspersor está activado, la temperatura baja poco a poco
    if (this.isActuatorActive("sprinkler")) {
      this.temperature = Math.max(22, this.temperature - 0.5);
    } else {
      this.temperature = Math.min(36, this.temperature + Math.random());
    }

    console.log(`☀️ Temperatura medida: ${this.temperature.toFixed(2)}°C`);
    this.mqttClient.publish(this.topic, JSON.stringify({ value: this.temperature.toFixed(2) }));
  }
}
