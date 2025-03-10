
import { IActuator } from "../interfaces/IActuator";

export class WaterPumpActuator implements IActuator {
    private topic: string = "actuators/waterPump";

    constructor(private mqttClient: any) {} // reemplazar `any` con `IMQTTClient`

    executeAction(command: string): void {
        console.log(`Bomba de agua ${command === "ON" ? "activada" : "desactivada"}`);
    }

    getTopic(): string {
        return this.topic;
    }
}