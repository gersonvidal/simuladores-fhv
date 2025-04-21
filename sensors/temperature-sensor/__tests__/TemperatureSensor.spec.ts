import { TemperatureSensor } from "../TemperatureSensor";
import { IMqttClient } from "../../../core/mqtt/IMqttClient";

// Subclase para pruebas
class TestTemperatureSensor extends TemperatureSensor {
  private sprinklerActive: boolean = false;

  setSprinklerState(state: boolean) {
    this.sprinklerActive = state;
  }

  protected override isActuatorActive(actuatorType: string): boolean {
    return this.sprinklerActive;
  }

  setTemperature(value: number): void {
    (this as any).temperature = value;
  }

  getTemperature(): number {
    return (this as any).temperature;
  }
}

describe("TemperatureSensor", () => {
  let mockMqttClient: IMqttClient;
  let sensor: TestTemperatureSensor;
  const greenhouseId = "greenhouse-1";

  beforeEach(() => {
    mockMqttClient = {
      publish: jest.fn()
    } as unknown as IMqttClient;

    sensor = new TestTemperatureSensor(mockMqttClient, greenhouseId);
  });

  it("should publish a temperature value between 22 and 36", () => {
    sensor.setSprinklerState(false);
    sensor.readAndPublishData();

    expect(mockMqttClient.publish).toHaveBeenCalled();

    const [topic, payload] = (mockMqttClient.publish as jest.Mock).mock.calls[0];
    const data = JSON.parse(payload);

    expect(topic).toBe(sensor.getTopic());
    const value = parseFloat(data.value);
    expect(value).toBeGreaterThanOrEqual(22);
    expect(value).toBeLessThanOrEqual(36);
  });

  it("should decrease temperature if sprinkler is active", () => {
    sensor.setSprinklerState(true);
    sensor.setTemperature(30);

    sensor.readAndPublishData();

    expect(sensor.getTemperature()).toBeLessThan(30);
  });
});