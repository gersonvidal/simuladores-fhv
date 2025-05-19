import { Sensor } from "../Sensor.js"; // Asegúrate de importar correctamente la clase base
import { IMqttClient } from "../../core/mqtt/IMqttClient"; // Usa la interfaz de MQTT

export class HumiditySensor extends Sensor {
  private humidity: number = Math.random() * (90 - 65) + 65; // Estado interno

  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "humidity");
  }

  readAndPublishData(): void {
    // Si el aspersor está activado, la humedad sube gradualmente
    if (this.isActuatorActive("sprinkler")) {
      // Subida realista y oscilación en zona óptima (70-85%)
      if (this.humidity < 75) {
        this.humidity += 1.5;
      } else if (this.humidity < 85) {
        this.humidity += Math.random() * 0.5 - 0.25; // fluctúa ligeramente
      }
    } else {
      // Baja constante y realista
      this.humidity = Math.max(40, this.humidity - Math.random() * 0.5);
    }

    console.log(`🚿 Humedad medida: ${this.humidity.toFixed(2)}%`);
    this.mqttClient.publish(
      this.topic,
      JSON.stringify({ value: this.humidity.toFixed(2) })
    );
  }
}