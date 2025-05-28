jest.mock("mqtt", () => {
  return {
    connect: jest.fn(() => ({
      publish: jest.fn(),
      subscribe: jest.fn(),
      on: jest.fn(),
      end: jest.fn(),
    })),
  };
});

import { MqttClientImplementation } from "../MqttClientImplementation";

describe("MqttClientImplementation", () => {
  let mqttClient: MqttClientImplementation;

  beforeEach(() => {
    mqttClient = new MqttClientImplementation("mqtt://broker.test");
  });

  it("should store and retrieve actuator state", () => {
    mqttClient.setActuatorState("actuator/light", true);

    expect(mqttClient.isActuatorOn("actuator/light")).toBe(true);
    expect(mqttClient.isActuatorOn("actuator/fan")).toBe(false); // no definido
  });
});
