// src/factories/WaterPumpActuatorFactory.ts
import { DeviceFactory } from "@factories/DeviceFactory";
import { Actuator } from "../../actuators/Actuator";
import { WaterPumpActuator } from "../../actuators/water-pump-actuator/WaterPumpActuator";
import { MqttClientImplementation } from "core/mqtt/MqttClientImplementation";
import { IMqttClient } from "core/mqtt/IMqttClient";

export class WaterPumpActuatorFactory implements DeviceFactory<Actuator> {
  createDevice(greenhouseId: string): Actuator {
    const mqttClient: IMqttClient = new MqttClientImplementation(
      "mqtt://localhost:1883"
    );

    return new WaterPumpActuator(mqttClient, greenhouseId);
  }
}