// src/factories/SprinklerActuatorFactory.ts
import { DeviceFactory } from "@factories/DeviceFactory";
import { Actuator } from "../../actuators/Actuator";
import { SprinklerActuator } from "../../actuators/sprinkler-actuator/SprinklerActuator";
import { IMqttClient } from "../../core/mqtt/IMqttClient";
import { MqttClientImplementation } from "core/mqtt/MqttClientImplementation";

export class SprinklerActuatorFactory implements DeviceFactory<Actuator> {
  createDevice(greenhouseId: string): Actuator {
    const mqttClient: IMqttClient = new MqttClientImplementation(
      "mqtt://localhost:1883"
    );

    return new SprinklerActuator(mqttClient, greenhouseId);
  }
}