
import { IActuator } from "../interfaces/IActuator";

export class SprinklerActuator implements IActuator {
    private topic: string = "actuators/sprinkler";

    constructor(private mqttClient: any) {} //reemplazar `any` con `IMQTTClient` si tienes la interfaz

    executeAction(command: string): void {
        console.log(`Aspersor ${command === "ON" ? "activado" : "desactivado"}`);
    }

    getTopic(): string {
        return this.topic;
    }
}