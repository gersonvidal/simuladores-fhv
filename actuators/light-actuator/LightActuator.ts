// actuators/light-actuator/LightActuator.ts
import { Actuator } from "../Actuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient.js";

export class LightActuator extends Actuator {
  private lastCommand: string | null = null;

  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "light", "light"); // "light" es el tipo de actuador y el otro "light" es el tipo del sensor
  }

  protected handleSensorData(message: string): void {
    try {
      const data = JSON.parse(message);
      // Se espera que el sensor publique {"value": <número>}
      const luminosity = parseFloat(data.value);
      if (isNaN(luminosity)) {
        console.error("Valor inválido en sensor de luz:", message);
        return;
      }
      // Si la luminosidad es menor a 300 lux, se considera insuficiente y se enciende la luz.
      if (luminosity < 300) {
        this.executeAction("ON");
      } else {
        this.executeAction("OFF");
      }
    } catch (error) {
      console.error("Error procesando sensor de luz:", error);
    }
  }

  executeAction(command: string): void {
    if (command === this.lastCommand) return; // 👈 Evita spam si el estado no cambió

    this.lastCommand = command;

    console.log(
      `💡 Lámpara ${command === "ON" ? "encendida 🟢" : "apagada 🔴"}`
    );
    this.mqttClient.publish(this.getTopic(), command); // Publica el comando
  }
}