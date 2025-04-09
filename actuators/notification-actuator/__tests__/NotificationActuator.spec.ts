import { NotificationActuator } from "../NotificationActuator";
import { IMqttClient } from "../../../core/mqtt/IMqttClient";

// Subclase para exponer método protegido
class TestNotificationActuator extends NotificationActuator {
  public testHandleSensorData(message: string): void {
    this.handleSensorData(message);
  }
}

describe("NotificationActuator", () => {
  let mockMqttClient: IMqttClient;
  let actuator: TestNotificationActuator;
  const greenhouseId = "greenhouse-1";

  beforeEach(() => {
    mockMqttClient = {
      publish: jest.fn(),
      subscribe: jest.fn()
    } as unknown as IMqttClient;

    actuator = new TestNotificationActuator(mockMqttClient, greenhouseId);
  });

  it("should send a notification when temperature is below 24°C", () => {
    const message = JSON.stringify({ value: "22" });
    actuator.testHandleSensorData(message);

    expect(mockMqttClient.publish).toHaveBeenCalledTimes(1);
    expect(mockMqttClient.publish).toHaveBeenCalledWith(
      actuator.getTopic(),
      "Alerta de temperatura: 22°C"
    );
  });

  it("should send a notification when temperature is above 33°C", () => {
    const message = JSON.stringify({ value: "35" });
    actuator.testHandleSensorData(message);

    expect(mockMqttClient.publish).toHaveBeenCalledTimes(1);
    expect(mockMqttClient.publish).toHaveBeenCalledWith(
      actuator.getTopic(),
      "Alerta de temperatura: 35°C"
    );
  });

  it("should NOT send a notification when temperature is between 24°C and 33°C", () => {
    const message = JSON.stringify({ value: "28" });
    actuator.testHandleSensorData(message);

    expect(mockMqttClient.publish).toHaveBeenCalledTimes(0);
  });

  it("should handle non-numeric temperature values without crashing", () => {
    const message = JSON.stringify({ value: "not-a-number" });

    expect(() => actuator.testHandleSensorData(message)).not.toThrow();
    expect(mockMqttClient.publish).toHaveBeenCalledTimes(0);
  });

  it("should handle malformed JSON without crashing", () => {
    const badMessage = "{ invalid json";

    expect(() => actuator.testHandleSensorData(badMessage)).not.toThrow();
    expect(mockMqttClient.publish).toHaveBeenCalledTimes(0);
  });

  it("should not repeat the same notification (avoid spam)", () => {
    const alertMessage = "Alerta de temperatura: 20°C";

    actuator.executeAction(alertMessage);
    actuator.executeAction(alertMessage);

    expect(mockMqttClient.publish).toHaveBeenCalledTimes(1);
    expect(mockMqttClient.publish).toHaveBeenCalledWith(
      actuator.getTopic(),
      alertMessage
    );
  });
});