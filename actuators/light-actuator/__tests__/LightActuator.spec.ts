import { LightActuator } from "../LightActuator";
import { IMqttClient } from "../../../core/mqtt/IMqttClient";

// Subclase para exponer método protegido
class TestLightActuator extends LightActuator {
  public testHandleSensorData(message: string): void {
    this.handleSensorData(message);
  }
}

describe("LightActuator", () => {
  let mockMqttClient: IMqttClient;
  let actuator: TestLightActuator;
  const greenhouseId = "greenhouse-1";

  beforeEach(() => {
    mockMqttClient = {
      publish: jest.fn(),
      subscribe: jest.fn()
    } as unknown as IMqttClient;

    actuator = new TestLightActuator(mockMqttClient, greenhouseId);
  });

  it("should turn ON the light when luminosity is below 300", () => {
    const message = JSON.stringify({ value: "250" });
    actuator.testHandleSensorData(message);

    expect(mockMqttClient.publish).toHaveBeenCalledTimes(1);
    expect(mockMqttClient.publish).toHaveBeenCalledWith(
      actuator.getTopic(),
      "ON"
    );
  });

  it("should turn OFF the light when luminosity is 300 or more", () => {
    const message = JSON.stringify({ value: "350" });
    actuator.testHandleSensorData(message);

    expect(mockMqttClient.publish).toHaveBeenCalledTimes(1);
    expect(mockMqttClient.publish).toHaveBeenCalledWith(
      actuator.getTopic(),
      "OFF"
    );
  });

  it("should handle non-numeric luminosity values without crashing", () => {
    const message = JSON.stringify({ value: "not-a-number" });

    expect(() => actuator.testHandleSensorData(message)).not.toThrow();
    expect(mockMqttClient.publish).toHaveBeenCalledTimes(0);
  });

  it("should handle malformed JSON without crashing", () => {
    const badMessage = "{ this is not valid json";

    expect(() => actuator.testHandleSensorData(badMessage)).not.toThrow();
    expect(mockMqttClient.publish).toHaveBeenCalledTimes(0);
  });

  it("should not execute the same command twice", () => {
    actuator.executeAction("OFF");
    actuator.executeAction("OFF");

    expect(mockMqttClient.publish).toHaveBeenCalledTimes(1);
    expect(mockMqttClient.publish).toHaveBeenCalledWith(
      actuator.getTopic(),
      "OFF"
    );
  });
});