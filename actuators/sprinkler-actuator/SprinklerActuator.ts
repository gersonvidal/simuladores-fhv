import { Actuator } from "../Actuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient";

export class SprinklerActuator extends Actuator {
  private lastCommand: string = "OFF";

  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "sprinkler", "humidity");

    this.mqttClient.publish(
      `${this.getTopic()}/status`,
      JSON.stringify({ state: "OFF" }),
      { retain: true }
    );
  }

  protected handleSensorData(message: string): void {
    try {
      const data = JSON.parse(message);
      const humidity = parseFloat(data.value);
      if (isNaN(humidity)) {
        console.error("Valor inválido en sensor de humedad:", message);
        return;
      }
      // Si la humedad es menor a 70%, se activa el aspersor; de lo contrario, se desactiva.
      if (humidity < 70) {
        this.executeAction("ON");
      } else {
        this.executeAction("OFF");
      }
    } catch (error) {
      console.error("Error procesando sensor de humedad:", error);
    }
  }

  executeAction(command: string): void {
    if (command === this.lastCommand) return; // 👈 Evita spam si el estado no cambió

    this.lastCommand = command;

    console.log(
      `🚿 Aspersor ${command === "ON" ? "activado 🟢" : "desactivado 🔴"}`
    );

    this.mqttClient.publish(
      `${this.getTopic()}/status`,
      JSON.stringify({ state: command }),
      { retain: true }
    );
  }
}
