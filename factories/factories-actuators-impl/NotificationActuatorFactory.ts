// src/factories/NotificationActuatorFactory.ts
import { DeviceFactory } from "@factories/DeviceFactory";
import { Actuator } from "../../actuators/Actuator";
import { NotificationActuator } from "../../actuators/notification-actuator/NotificationActuator";
import { IMqttClient } from "../../core/mqtt/IMqttClient";
import { MqttClientImplementation } from "core/mqtt/MqttClientImplementation";

export class NotificationActuatorFactory implements DeviceFactory<Actuator> {
  createDevice(greenhouseId: string): Actuator {
    const mqttClient: IMqttClient = new MqttClientImplementation(
      "mqtt://localhost:1883"
    );

    return new NotificationActuator(mqttClient, greenhouseId);
  }
}