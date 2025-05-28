import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation.js";
import { FanActuator } from "../../actuators/fan-actuator/FanActuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient.js";
import { Actuator } from "@actuators/Actuator.js";
import { DeviceFactory } from "@factories/DeviceFactory.js";

export class FanActuatorFactory implements DeviceFactory<Actuator> {
  createDevice(greenhouseId: string, brokerUrl: string): Actuator {
    const mqttClient: IMqttClient = new MqttClientImplementation(brokerUrl);

    return new FanActuator(mqttClient, greenhouseId);
  }
}