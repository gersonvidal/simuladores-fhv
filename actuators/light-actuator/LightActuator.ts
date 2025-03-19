// actuators/light-actuator/LightActuator.ts
import { Actuator } from "../Actuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient";

export class LightActuator extends Actuator {
    constructor(mqttClient: IMqttClient, greenhouseId: string) {
        super(mqttClient, greenhouseId, "light"); // "light" es el tipo de actuador
    }

    executeAction(command: string): void {
        console.log(`Lámpara ${command === "ON" ? "encendida" : "apagada"}`);
    }
}