
import { IActuator } from "../interfaces/IActuator";

export class NotificationActuator implements IActuator {
    private topic: string = "actuators/notification";

    constructor(private mqttClient: any) {} //reemplazar `any` con `IMQTTClient`

    executeAction(command: string): void {
        console.log(`Notificación enviada: ${command}`);
    }

    getTopic(): string {
        return this.topic;
    }
}