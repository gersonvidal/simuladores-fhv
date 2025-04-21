// src/factories/SprinklerActuatorFactory.ts
import { DeviceFactory } from "@factories/DeviceFactory.js";
import { Actuator } from "../../actuators/Actuator.js";
import { SprinklerActuator } from "../../actuators/sprinkler-actuator/SprinklerActuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient.js";
import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation.js";

export class SprinklerActuatorFactory implements DeviceFactory<Actuator> {
  createDevice(greenhouseId: string): Actuator {
    const mqttClient: IMqttClient = new MqttClientImplementation(
      "mqtt://localhost:1883"
    );

    return new SprinklerActuator(mqttClient, greenhouseId);
  }
}