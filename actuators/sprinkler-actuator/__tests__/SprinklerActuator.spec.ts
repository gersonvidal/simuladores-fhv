import { SprinklerActuator } from "../SprinklerActuator";
import { IMqttClient } from "../../../core/mqtt/IMqttClient";

// Subclase para pruebas
class TestSprinklerActuator extends SprinklerActuator {
  public testHandleSensorData(message: string) {
    this.handleSensorData(message); // ✅ Se permite porque es dentro de la subclase
  }
}

describe("SprinklerActuator", () => {
  let mockMqttClient: IMqttClient;
  let actuator: TestSprinklerActuator;
  const greenhouseId = "greenhouse-1";

  beforeEach(() => {
    mockMqttClient = {
      publish: jest.fn(),
      subscribe: jest.fn(),
    } as unknown as IMqttClient;

    actuator = new TestSprinklerActuator(mockMqttClient, greenhouseId);
  });

  it("should turn ON the sprinkler when humidity is below 70", () => {
    const message = JSON.stringify({ value: "60" });
    actuator.testHandleSensorData(message);
    expect(mockMqttClient.publish).toHaveBeenCalledTimes(1);
    expect(mockMqttClient.publish).toHaveBeenCalledWith(
      actuator.getTopic(),
      "ON"
    );
  });

  it("should turn OFF the sprinkler when humidity is 70 or more", () => {
    const message = JSON.stringify({ value: "75" });
    actuator.testHandleSensorData(message);
    expect(mockMqttClient.publish).toHaveBeenCalledTimes(1);
    expect(mockMqttClient.publish).toHaveBeenCalledWith(
      actuator.getTopic(),
      "OFF"
    );
  });

  it("should handle non-numeric humidity values without crashing", () => {
    const message = JSON.stringify({ value: "invalid" });
    expect(() => actuator.testHandleSensorData(message)).not.toThrow();
    expect(mockMqttClient.publish).toHaveBeenCalledTimes(0);
  });

  it("should handle malformed JSON without crashing", () => {
    const badMessage = "{ invalid json";
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
