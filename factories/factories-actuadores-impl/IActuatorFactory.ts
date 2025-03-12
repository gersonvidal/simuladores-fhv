// src/interfaces/IActuatorFactory.ts
import { IActuator } from "../../interfaces/IActuator";

export interface IActuatorFactory {
    createActuator(): IActuator;
}