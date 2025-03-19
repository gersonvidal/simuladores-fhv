// src/factories/SprinklerActuatorFactory.ts
import { IActuatorFactory } from "../factories-actuators-impl/IActuatorFactory";
import { Actuator } from "../../actuators/Actuator";
import { SprinklerActuator } from "../../actuators/sprinkler-actuator/SprinklerActuator";
import { IMqttClient } from "../../core/mqtt/IMqttClient";

export class SprinklerActuatorFactory implements IActuatorFactory {
    // Añadimos el greenhouseId como parámetro del constructor
    constructor(private mqttClient: IMqttClient, private greenhouseId: string) {}

    createActuator(): Actuator {
        // Pasamos tanto mqttClient como greenhouseId al constructor
        return new SprinklerActuator(this.mqttClient, this.greenhouseId);
    }
}
