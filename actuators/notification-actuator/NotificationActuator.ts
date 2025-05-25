// actuators/notification-actuator/NotificationActuator.ts
import { Actuator } from "../Actuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient";

export class NotificationActuator extends Actuator {
  private lastCommand: string | null = null;

  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "notification", "temperature");

    this.mqttClient.publish(
      `${this.getTopic()}/status`,
      JSON.stringify({ state: "ON" }),
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
      // Si la temperatura está fuera del rango (por ejemplo, menor a 24°C o mayor a 33°C), se envía una notificación.
      if (temperature < 24 || temperature > 33) {
        this.executeAction(`Alerta de temperatura: ${temperature}°C`);
      } else {
        console.log(`Temperatura normal: ${temperature}°C`);
      }
    } catch (error) {
      console.error("Error procesando sensor de temperatura:", error);
    }
  }

  executeAction(command: string): void {
    if (command === this.lastCommand) return; // 👈 Evita spam si el estado no cambió

    this.lastCommand = command;

    console.log(`☀️📡 Notificación enviada: ${command}`);

    this.mqttClient.publish(this.getTopic(), command);
  }
}
