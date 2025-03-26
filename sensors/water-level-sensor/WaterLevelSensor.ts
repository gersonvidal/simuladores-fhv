import { Sensor } from "../Sensor.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient.js"; // Usa la interfaz correcta

export class WaterLevelSensor extends Sensor {
  private waterLevel: number = Math.random() * 100; // Estado interno

  readAndPublishData(): void {
    // Si la bomba de agua está activada, el nivel de agua sube gradualmente
    if (this.isActuatorActive("waterPump")) {
      this.waterLevel = Math.min(100, this.waterLevel + 2);
    } else {
      this.waterLevel = Math.max(0, this.waterLevel - Math.random());
    }

    console.log(`💧 Nivel de agua: ${this.waterLevel.toFixed(2)}%`);
    this.mqttClient.publish(this.topic, JSON.stringify({ value: this.waterLevel.toFixed(2) }));
  }
}

