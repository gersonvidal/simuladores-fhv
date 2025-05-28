// src/factories/WaterPumpActuatorFactory.ts
import { DeviceFactory } from "@factories/DeviceFactory.js";
import { Actuator } from "../../actuators/Actuator.js";
import { WaterPumpActuator } from "../../actuators/water-pump-actuator/WaterPumpActuator.js";
import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient.js";

export class WaterPumpActuatorFactory implements DeviceFactory<Actuator> {
  createDevice(greenhouseId: string, brokerUrl: string): Actuator {
    const mqttClient: IMqttClient = new MqttClientImplementation(brokerUrl);

    return new WaterPumpActuator(mqttClient, greenhouseId);
  }
}
