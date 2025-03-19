// src/factories/NotificationActuatorFactory.ts
import { IActuatorFactory } from "../factories-actuators-impl/IActuatorFactory";
import { Actuator } from "../../actuators/Actuator";
import { NotificationActuator } from "../../actuators/notification-actuator/NotificationActuator";
import { IMqttClient } from "../../core/mqtt/IMqttClient";

export class NotificationActuatorFactory implements IActuatorFactory {
    // Añadimos el greenhouseId como parámetro del constructor
    constructor(private mqttClient: IMqttClient, private greenhouseId: string) {}

    createActuator(): Actuator {
        // Pasamos tanto mqttClient como greenhouseId al constructor
        return new NotificationActuator(this.mqttClient, this.greenhouseId);
    }
}
