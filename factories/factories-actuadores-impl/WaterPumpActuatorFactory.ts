// src/factories/WaterPumpActuatorFactory.ts
import { IActuatorFactory } from "../../factories/factories-actuadores-impl/IActuatorFactory";
import { IActuator } from "../../interfaces/IActuator";
import { WaterPumpActuator } from "../../actuadores/actuador-bomba-de-agua/WaterPumpActuator";

export class WaterPumpActuatorFactory implements IActuatorFactory {
    createActuator(): IActuator {
        const mqttClient = {
            publish: (topic: string, message: string) => {
                console.log(`Publicando en ${topic}: ${message}`);
            },
        };
        return new WaterPumpActuator(mqttClient);
    }
}