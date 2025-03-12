// src/factories/NotificationActuatorFactory.ts
import { IActuatorFactory } from "../../factories/factories-actuadores-impl/IActuatorFactory";
import { IActuator } from "../../interfaces/IActuator";
import { NotificationActuator } from "../../actuadores/actuador-notificaciones/NotificationActuator";

export class NotificationActuatorFactory implements IActuatorFactory {
    createActuator(): IActuator {
        const mqttClient = {
            publish: (topic: string, message: string) => {
                console.log(`Publicando en ${topic}: ${message}`);
            },
        };
        return new NotificationActuator(mqttClient);
    }
}