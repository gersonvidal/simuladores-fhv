// actuators/notification-actuator/NotificationActuator.ts
import { Actuator } from "../Actuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient";

export class NotificationActuator extends Actuator {
    constructor(mqttClient: IMqttClient, greenhouseId: string) {
        // Llama a super() para inicializar la clase base
        super(mqttClient, greenhouseId, "notification");
    }

    executeAction(command: string): void {
        console.log(`Notificación enviada: ${command}`);
        this.mqttClient.publish(this.getTopic(), command); // Publica el comando
    }
}