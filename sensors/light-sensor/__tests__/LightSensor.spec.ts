import { LightSensor } from "../LightSensor";
import { IMqttClient } from "../../../core/mqtt/IMqttClient";

// Subclase para pruebas
class TestLightSensor extends LightSensor {
  private lightActive: boolean = false;

  setLightState(state: boolean) {
    this.lightActive = state;
  }

  protected override isActuatorActive(actuatorType: string): boolean {
    return this.lightActive;
  }

  setLuminosity(value: number): void {
    (this as any).luminosity = value;
  }

  getLuminosity(): number {
    return (this as any).luminosity;
  }
}

describe("LightSensor", () => {
  let mockMqttClient: IMqttClient;
  let sensor: TestLightSensor;
  const greenhouseId = "greenhouse-1";

  beforeEach(() => {
    mockMqttClient = {
      publish: jest.fn()
    } as unknown as IMqttClient;

    sensor = new TestLightSensor(mockMqttClient, greenhouseId, "light");
  });

  it("should publish a luminosity value between 0 and 1000", () => {
    sensor.setLightState(false);
    sensor.readAndPublishData();

    expect(mockMqttClient.publish).toHaveBeenCalled();

    const [topic, payload] = (mockMqttClient.publish as jest.Mock).mock.calls[0];
    const data = JSON.parse(payload);

    expect(topic).toBe(sensor.getTopic());
    const value = parseFloat(data.value);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(1000);
  });

  it("should increase luminosity if light actuator is active", () => {
    sensor.setLightState(true);
    sensor.setLuminosity(800);

    sensor.readAndPublishData();

    expect(sensor.getLuminosity()).toBeGreaterThan(800);
  });
});