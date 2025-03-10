
import { IActuator } from "../interfaces/IActuator";

export class LightActuator implements IActuator {
    private topic: string = "actuators/light";

    constructor(private mqttClient: any) {} // reemplazar `any` con `IMQTTClient`

    executeAction(command: string): void {
        console.log(`Lámpara ${command === "ON" ? "encendida" : "apagada"}`);
    }

    getTopic(): string {
        return this.topic;
    }
}