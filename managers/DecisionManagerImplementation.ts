import { DecisionManager } from "./DecisionManager";

export class DecisionManagerImplementation extends DecisionManager {
  subscribeToSensors(): void {
    const sensorTopics = [
      "greenhouse/+/sensor/humidity",
      "greenhouse/+/sensor/temperature",
      "greenhouse/+/sensor/water_level",
      "greenhouse/+/sensor/light",
    ];

    sensorTopics.forEach((topic) => {
      this.mqttClient.subscribe(topic, (message) => {
        this.evaluate(message, topic);
      });
    });
  }

  private evaluate(sensorData: string, topic: string): void {
    const data = JSON.parse(sensorData);
    const greenhouseId = topic.split("/")[1]; // Extraer el ID del invernadero
    const value = data.value;

    console.log(
      `📊 Datos recibidos de ${topic} en el invernadero ${greenhouseId}: ${value}`
    );

    if (topic.includes("humidity") && value < 40) {
      this.publishActionForActuator(
        "turn_on",
        `greenhouse/${greenhouseId}/actuator/sprinkler`
      );
    }

    if (topic.includes("water_level") && value < 20) {
      this.publishActionForActuator(
        "turn_on",
        `greenhouse/${greenhouseId}/actuator/water_pump`
      );
    }
  }

  private publishActionForActuator(
    command: string,
    actuatorTopic: string
  ): void {
    console.log(`🚀 Envíando comando "${command}" a ${actuatorTopic}`);
    this.mqttClient.publish(actuatorTopic, JSON.stringify({ action: command }));
  }
}
