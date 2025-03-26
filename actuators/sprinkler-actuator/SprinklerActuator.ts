import { Actuator } from "../Actuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient";

export class SprinklerActuator extends Actuator {
    constructor(mqttClient: IMqttClient, greenhouseId: string) {
        super(mqttClient, greenhouseId, "sprinkler");
    }

    executeAction(command: string): void {
        console.log(`Aspersor ${command === "ON" ? "activado" : "desactivado"}`);
    }
}
