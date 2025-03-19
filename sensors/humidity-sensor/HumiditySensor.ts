import { Sensor } from "../Sensor.js"; // Asegúrate de importar correctamente la clase base
import { IMqttClient } from "../../core/mqtt/MqttClient"; // Usa la interfaz de MQTT

export class HumiditySensor extends Sensor {
  constructor(mqttClient: IMqttClient, greenhouseId: string, sensorType: string) {
    super(mqttClient, greenhouseId, sensorType); // Llamada al constructor de la clase base
  }

  readAndPublishData(): void {
    const humidity = (Math.random() * (90 - 65) + 65).toFixed(2);
    console.log(`Humedad medida: ${humidity}%`);
    this.mqttClient.publish(this.topic, JSON.stringify({ value: humidity }));
  }
}
