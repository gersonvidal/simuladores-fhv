import { WaterPumpActuator } from "../WaterPumpActuator";
import { IMqttClient } from "../../../core/mqtt/IMqttClient";

// Subclase para exponer método protegido
class TestWaterPumpActuator extends WaterPumpActuator {
  public testHandleSensorData(message: string): void {
    this.handleSensorData(message);
  }
}

describe("WaterPumpActuator", () => {
  let mockMqttClient: IMqttClient;
  let actuator: TestWaterPumpActuator;
  const greenhouseId = "greenhouse-1";

  beforeEach(() => {
    mockMqttClient = {
      publish: jest.fn(),
      subscribe: jest.fn()
    } as unknown as IMqttClient;

    actuator = new TestWaterPumpActuator(mockMqttClient, greenhouseId);
  });

  it("should turn ON the water pump when level is below 30%", () => {
    const message = JSON.stringify({ value: "20" });
    actuator.testHandleSensorData(message);

    expect(mockMqttClient.publish).toHaveBeenCalledTimes(1);
    expect(mockMqttClient.publish).toHaveBeenCalledWith(
      actuator.getTopic(),
      "ON"
    );
  });

  it("should turn OFF the water pump when level is 30% or more", () => {
    const message = JSON.stringify({ value: "40" });
    actuator.testHandleSensorData(message);

    expect(mockMqttClient.publish).toHaveBeenCalledTimes(1);
    expect(mockMqttClient.publish).toHaveBeenCalledWith(
      actuator.getTopic(),
      "OFF"
    );
  });

  it("should handle non-numeric water level values without crashing", () => {
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