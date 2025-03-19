
import { Actuator } from "../Actuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient";

export class SprinklerActuator extends Actuator {
    constructor(mqttClient: IMqttClient, greenhouseId: string) {
        // Llama a super() para inicializar la clase base
        super(mqttClient, greenhouseId, "sprinkler");
    }

    executeAction(command: string): void {
        console.log(`Aspersor ${command === "ON" ? "activado" : "desactivado"}`);
        this.mqttClient.publish(this.getTopic(), command); // Publica el comando
    }
}
