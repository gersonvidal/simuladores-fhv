// actuators/notification-actuator/NotificationActuator.ts
import { Actuator } from "../Actuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient";

export class NotificationActuator extends Actuator {
  private lastCommand: string | null = null;
  private SENSOR_INFO: Record<string, { label: string; unit: string }> = {
    humidity: { label: "humedad", unit: "%" },
    light: { label: "luminosidad", unit: " lux" },
    water_level: { label: "nivel de agua", unit: "%" },
  };

  constructor(mqttClient: IMqttClient, greenhouseId: string) {
    super(mqttClient, greenhouseId, "notification", "temperature");

    this.subscribeToAdditionalSensor("humidity", (val) => val < 70);
    this.subscribeToAdditionalSensor("light", (val) => val < 300);
    this.subscribeToAdditionalSensor("water_level", (val) => val < 30);

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

  private subscribeToAdditionalSensor(
    sensorType: string,
    thresholdFunction: (value: number) => boolean
  ): void {
    const topic = `greenhouse/${this.greenhouseId}/sensor/${sensorType}`;

    this.mqttClient.subscribe(topic, (message: string) => {
      if (this.mode !== "AUTO") return;

      try {
        const data = JSON.parse(message);
        const value = parseFloat(data.value);
        if (isNaN(value)) {
          console.error(`Valor inválido recibido de ${sensorType}:`, message);
          return;
        }

        if (thresholdFunction(value)) {
          const { label, unit } = this.SENSOR_INFO[sensorType] || {
            label: sensorType,
            unit: "",
          };

          const alert = `Alerta de ${label}: ${value}${unit}`;
          this.executeAction(alert);
        } else {
          const { label, unit } = this.SENSOR_INFO[sensorType] || {
            label: sensorType,
            unit: "",
          };
          console.log(`${label} normal: ${value}${unit}`);
        }
      } catch (error) {
        console.error(`Error procesando ${sensorType}:`, error);
      }
    });

    console.log(`📡 Suscrito a sensor adicional: ${sensorType}`);
  }
}
