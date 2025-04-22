// src/factories/NotificationActuatorFactory.ts
import { DeviceFactory } from "@factories/DeviceFactory.js";
import { Actuator } from "../../actuators/Actuator.js";
import { NotificationActuator } from "../../actuators/notification-actuator/NotificationActuator.js";
import { IMqttClient } from "../../core/mqtt/IMqttClient.js";
import { MqttClientImplementation } from "../../core/mqtt/MqttClientImplementation.js";

export class NotificationActuatorFactory implements DeviceFactory<Actuator> {
  createDevice(greenhouseId: string, brokerUrl: string): Actuator {
    const mqttClient: IMqttClient = new MqttClientImplementation(brokerUrl);

    return new NotificationActuator(mqttClient, greenhouseId);
  }
}
