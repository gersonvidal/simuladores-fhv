// src/factories/WaterPumpActuatorFactory.ts
import { IActuatorFactory } from "../factories-actuators-impl/IActuatorFactory";
import { Actuator } from "../../actuators/Actuator";
import { WaterPumpActuator } from "../../actuators/water-pump-actuator/WaterPumpActuator";
import { mqttClient } from "../../core/mqtt/MqttClient"

export class WaterPumpActuatorFactory implements IActuatorFactory {
    createActuator(greenhouseId: string): Actuator {
        return new WaterPumpActuator(mqttClient, greenhouseId); // Pasa mqttClient y greenhouseId
    }
}