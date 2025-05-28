import { Device } from "../core/device/Device.js";
import { IMqttClient } from "../core/mqtt/IMqttClient";

export abstract class Actuator extends Device {
  private sensorTopic: string;
  private commandTopic: string;
  protected mode: "AUTO" | "MANUAL" = "AUTO";

  constructor(
    mqttClient: IMqttClient,
    greenhouseId: string,
    actuatorType: string,
    sensorType: string
  ) {
    super(
      mqttClient,
      greenhouseId,
      `greenhouse/${greenhouseId}/actuator/${actuatorType}`
    );
    this.sensorTopic = `greenhouse/${greenhouseId}/sensor/${sensorType}`;
    this.commandTopic = `${this.getTopic()}/command`;

    this.subscribeToSensorTopic();
    this.subscribeToClientCommands();
  }

  private subscribeToSensorTopic(): void {
    this.mqttClient.subscribe(this.sensorTopic, (message: string) => {
      if (this.mode === "AUTO") {
        this.handleSensorData(message.toString());
      }
    });
  }

  protected abstract handleSensorData(message: string): void;

  abstract executeAction(command: string): void;

  private subscribeToClientCommands(): void {
    this.mqttClient.subscribe(this.commandTopic, (message: string) => {
      try {
        const data = JSON.parse(message);

        if (data.mode === "AUTO") {
          this.mode = "AUTO";

          console.log(`🔄 Modo automático activado para ${this.getTopic()}`);

          this.mqttClient.publish(
            `${this.getTopic()}/mode`,
            JSON.stringify({ mode: this.mode }),
            { retain: true }
          );
        } else if (data.mode === "MANUAL" && typeof data.command === "string") {
          this.mode = "MANUAL";

          console.log(
            `🛠️ Modo manual activado para ${this.getTopic()} -> Ejecutando: ${
              data.command
            }`
          );

          let extendedMode = "MANUAL";
          if (data.command === "ON") {
            extendedMode = "MANUAL_ON";
          } else if (data.command === "OFF") {
            extendedMode = "MANUAL_OFF";
          }

          this.mqttClient.publish(
            `${this.getTopic()}/mode`,
            JSON.stringify({ mode: extendedMode }),
            { retain: true }
          );

          this.executeAction(data.command);
        } else {
          console.warn("⚠️ Comando de cliente inválido:", message);
        }
      } catch (err) {
        console.error("❌ Error procesando comando del cliente:", err);
      }
    });
  }
}
