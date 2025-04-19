import { MqttClientImplementation } from "core/mqtt/MqttClientImplementation";
import { LightActuator } from "../../actuators/light-actuator/LightActuator";
import { IMqttClient } from "../../core/mqtt/IMqttClient";
import { Actuator } from "@actuators/Actuator";
import { DeviceFactory } from "@factories/DeviceFactory";

export class LightActuatorFactory implements DeviceFactory<Actuator> {
  createDevice(greenhouseId: string): Actuator {
    const mqttClient: IMqttClient = new MqttClientImplementation(
      "mqtt://localhost:1883"
    );

    return new LightActuator(mqttClient, greenhouseId);
  }
}