import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation.js";
import { LightActuator } from "../../actuators/light-actuator/LightActuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient.js";
import { Actuator } from "@actuators/Actuator.js";
import { DeviceFactory } from "@factories/DeviceFactory.js";

export class LightActuatorFactory implements DeviceFactory<Actuator> {
  createDevice(greenhouseId: string): Actuator {
    const mqttClient: IMqttClient = new MqttClientImplementation(
      "mqtt://localhost:1883"
    );

    return new LightActuator(mqttClient, greenhouseId);
  }
}