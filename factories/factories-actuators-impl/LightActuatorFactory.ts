import { IActuatorFactory } from "../../factories/factories-actuators-impl/IActuatorFactory";
import { LightActuator } from "../../actuators/light-actuator/LightActuator";
import { IMqttClient } from "../../core/mqtt/IMqttClient";

export class LightActuatorFactory implements IActuatorFactory {
    constructor(
        private mqttClient: IMqttClient,  // Usamos la interfaz aquí
        private greenhouseId: string
    ) {}

    createActuator(): LightActuator {
        return new LightActuator(this.mqttClient, this.greenhouseId);
    }
}
