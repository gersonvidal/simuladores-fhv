import { Sensor } from "../Sensor.js"; // Asegúrate de importar correctamente la clase base
import { IMqttClient } from "../../core/mqtt/IMqttClient"; // Usa la interfaz de MQTT

export class HumiditySensor extends Sensor {
  private humidity: number = Math.random() * (90 - 65) + 65; // Estado interno
  private sprinklerActive: boolean = false;

  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "humidity");
    
    this.subscribeToActuatorState("sprinkler", (state) => {
      this.sprinklerActive = state === "ON";
      console.log(`🛰️ Estado recibido del aspersor: ${state}`);
    });
  }

  readAndPublishData(): void {
    // Si el aspersor está activado, la humedad sube gradualmente
    if (this.sprinklerActive) {
      this.humidity = Math.min(90, this.humidity + 1.5);
    } else {
      this.humidity = Math.max(65, this.humidity - Math.random());
    }

    console.log(`🚿 Humedad medida: ${this.humidity.toFixed(2)}%`);
    this.mqttClient.publish(
      this.topic,
      JSON.stringify({ value: this.humidity.toFixed(2) })
    );
  }
}