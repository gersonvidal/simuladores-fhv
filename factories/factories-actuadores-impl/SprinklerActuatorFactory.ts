// src/factories/SprinklerActuatorFactory.ts
import { IActuatorFactory } from "../../factories/factories-actuadores-impl/IActuatorFactory";
import { IActuator } from "../../interfaces/IActuator";
import { SprinklerActuator } from "../../actuadores/actuador-aspersores/SprinklerActuator";

export class SprinklerActuatorFactory implements IActuatorFactory {
    createActuator(): IActuator {
        // Simulación de un cliente MQTT (puedes reemplazar esto con una implementación real)
        const mqttClient = {
            publish: (topic: string, message: string) => {
                console.log(`Publicando en ${topic}: ${message}`);
            },
        };
        return new SprinklerActuator(mqttClient);
    }
}