import { Actuator } from "../Actuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient.js";

export class FanActuator extends Actuator {
  private lastCommand: string = "OFF";

  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "fan", "temperature");

    this.mqttClient.publish(
      `${this.getTopic()}/status`,
      JSON.stringify({ state: "OFF" }),
      { retain: true }
    );
  }

  protected handleSensorData(message: string): void {
    try {
      const data = JSON.parse(message);
      const temperature = parseFloat(data.value);
      if (isNaN(temperature)) {
        console.error("Valor inválido en sensor de temperatura:", message);
        return;
      }
      // Si la temperatura está fuera del rango óptimo (mayor a 33°C), se enciende el ventilador.
      if (temperature > 33) {
        this.executeAction("ON");
      } else {
        this.executeAction("OFF");
      }
    } catch (error) {
      console.error("Error procesando sensor de temperatura:", error);
    }
  }

  executeAction(command: string): void {
    if (command === this.lastCommand) return; // 👈 Evita spam si el estado no cambió

    this.lastCommand = command;

    console.log(
      `💡 Ventilador ${command === "ON" ? "encendido 🟢" : "apagado 🔴"}`
    );

    this.mqttClient.publish(
      `${this.getTopic()}/status`,
      JSON.stringify({ state: command }),
      { retain: true }
    );
  }
}