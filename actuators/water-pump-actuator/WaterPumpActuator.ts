// actuators/water-pump-actuator/WaterPumpActuator.ts
import { Actuator } from "../Actuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient";

export class WaterPumpActuator extends Actuator {
    constructor(mqttClient: IMqttClient, greenhouseId: string) {
        // Llama a super() para inicializar la clase base
        super(mqttClient, greenhouseId, "waterPump");
    }

    executeAction(command: string): void {
        console.log(`Bomba de agua ${command === "ON" ? "activada" : "desactivada"}`);
        this.mqttClient.publish(this.getTopic(), command); // Publica el comando
    }
}