// src/factories/LightActuatorFactory.ts
import { IActuatorFactory } from "./IActuatorFactory";
import { IActuator } from "../../interfaces/IActuator";
import { LightActuator } from "../../actuadores/actuador-lamparas/LightActuator";

export class LightActuatorFactory implements IActuatorFactory {
    createActuator(): IActuator {
        const mqttClient = {
            publish: (topic: string, message: string) => {
                console.log(`Publicando en ${topic}: ${message}`);
            },
        };
        return new LightActuator(mqttClient);
    }
}