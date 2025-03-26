import { DecisionManager } from "./DecisionManager.js";
import { IMqttClient } from "../core/mqtt/IMqttClient";

export class DecisionManagerImplementation extends DecisionManager {
    constructor(mqttClient: IMqttClient) {
        super(mqttClient);  // Llama al constructor de la clase base
    }

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

        console.log(`📊 Datos recibidos de ${topic} en el invernadero ${greenhouseId}: ${value}`);

        if (topic.includes("humidity") && value < 40) {
            console.log(`🌱 Activando aspersor en el invernadero ${greenhouseId}`);
            this.publishActionForActuator("ON", `greenhouse/${greenhouseId}/actuator/sprinkler`);
        }

        if (topic.includes("water_level") && value < 20) {
            console.log(`💧 Activando bomba de agua en el invernadero ${greenhouseId}`);
            this.publishActionForActuator("ON", `greenhouse/${greenhouseId}/actuator/water_pump`);
        }
    }

    private publishActionForActuator(command: string, actuatorTopic: string): void {
        console.log(`🚀 Enviando comando "${command}" a ${actuatorTopic}`);
        this.mqttClient.publish(actuatorTopic, JSON.stringify({ action: command }));
    }
}
