import { Sensor } from "../Sensor.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient.js"; // Usa la interfaz correcta

export class TemperatureSensor extends Sensor {
  private temperature: number = Math.random() * (36 - 22) + 22;
  private sprinklerActive: boolean = false;

  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "temperature");

    this.subscribeToActuatorState("sprinkler", (state) => {
      this.sprinklerActive = state === "ON";
      console.log(`🛰️ Estado recibido del aspersor: ${state}`);
    });
  }

  readAndPublishData(): void {
    // Si el aspersor está activado, la temperatura baja poco a poco
    if (this.sprinklerActive) {
      this.temperature = Math.max(22, this.temperature - 0.5);
    } else {
      this.temperature = Math.min(36, this.temperature + Math.random());
    }

    console.log(`☀️ Temperatura medida: ${this.temperature.toFixed(2)}°C`);
    this.mqttClient.publish(
      this.topic,
      JSON.stringify({ value: this.temperature.toFixed(2) })
    );
  }
}