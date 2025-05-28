import { Sensor } from "../Sensor.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient.js"; // Usa la interfaz correcta

export class TemperatureSensor extends Sensor {
  private temperature: number = Math.random() * (36 - 22) + 22;
  private fanActive: boolean = false;

  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "temperature");

    this.subscribeToActuatorState("fan", (state) => {
      this.fanActive = state === "ON";
      console.log(`🛰️ Estado recibido del ventilador: ${state}`);
    });
  }

  readAndPublishData(): void {
    // Si el ventilador está activado, la temperatura baja
    if (this.fanActive) {
      this.temperature = Math.max(22, this.temperature - 6);
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