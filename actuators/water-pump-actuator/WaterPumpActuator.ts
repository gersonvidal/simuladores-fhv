// actuators/water-pump-actuator/WaterPumpActuator.ts
import { Actuator } from "../Actuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient";

export class WaterPumpActuator extends Actuator {
  private lastCommand: string | null = null;

  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    // Llama a super() para inicializar la clase base
    super(mqttClient, greenhouseId, "waterPump", "water_level");
  }

  protected handleSensorData(message: string): void {
    try {
      const data = JSON.parse(message);
      const waterLevel = parseFloat(data.value);
      if (isNaN(waterLevel)) {
        console.error("Valor inválido en sensor de nivel de agua:", message);
        return;
      }
      // Si el nivel de agua es menor a 30%, se activa la bomba; de lo contrario, se desactiva.
      if (waterLevel < 30) {
        this.executeAction("ON");
      } else {
        this.executeAction("OFF");
      }
    } catch (error) {
      console.error("Error procesando sensor de nivel de agua:", error);
    }
  }

  executeAction(command: string): void {
    if (command === this.lastCommand) return; // 👈 Evita spam si el estado no cambió
    
    this.lastCommand = command;

    console.log(
      `💧 Bomba de agua ${command === "ON" ? "activada 🟢" : "desactivada 🔴"}`
    );
    this.mqttClient.publish(this.getTopic(), command); // Publica el comando
  }
}
