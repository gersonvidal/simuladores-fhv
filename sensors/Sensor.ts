// src/sensors/Sensor.ts
import { IMqttClient } from "../core/mqtt/IMqttClient"; // Importa la interfaz IMqttClient
import { Device } from "../core/device/Device.js";

export abstract class Sensor extends Device {
  constructor(
    mqttClient: IMqttClient,
    greenhouseId: string,
    sensorType: string
  ) {
    super(
      mqttClient,
      greenhouseId,
      `greenhouse/${greenhouseId}/sensor/${sensorType}`
    );
  }

  readAndPublishData(): void {}

  protected subscribeToActuatorState(
    actuatorType: string,
    callback: (state: string) => void
  ): void {
    const topic = `greenhouse/${this.greenhouseId}/actuator/${actuatorType}/status`;
    
    this.mqttClient.subscribe(topic, (message: string) => {
      try {
        const parsed = JSON.parse(message);
        if (parsed.state === "ON" || parsed.state === "OFF") {
          callback(parsed.state);
        }
      } catch (err) {
        console.error(`❌ Error procesando estado del actuador (${actuatorType}):`, err);
      }
    });
  }
}
