// src/interfaces/IActuatorFactory.ts
import { Actuator } from "../../actuators/Actuator";

export interface IActuatorFactory {
    createActuator(greenhouseId: string): Actuator;
}