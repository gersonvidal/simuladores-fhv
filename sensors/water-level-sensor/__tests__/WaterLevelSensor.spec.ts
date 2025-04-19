import { WaterLevelSensor } from "../WaterLevelSensor";
import { IMqttClient } from "../../../core/mqtt/IMqttClient";

// Subclase para pruebas
class TestWaterLevelSensor extends WaterLevelSensor {
  private pumpActive: boolean = false;

  setWaterPumpState(state: boolean) {
    this.pumpActive = state;
  }

  protected override isActuatorActive(actuatorType: string): boolean {
    return this.pumpActive;
  }

  setWaterLevel(value: number): void {
    (this as any).waterLevel = value;
  }

  getWaterLevel(): number {
    return (this as any).waterLevel;
  }
}

describe("WaterLevelSensor", () => {
  let mockMqttClient: IMqttClient;
  let sensor: TestWaterLevelSensor;
  const greenhouseId = "greenhouse-1";

  beforeEach(() => {
    mockMqttClient = {
      publish: jest.fn()
    } as unknown as IMqttClient;

    sensor = new TestWaterLevelSensor(mockMqttClient, greenhouseId);
  });

  it("should publish a water level value between 0 and 100", () => {
    sensor.setWaterPumpState(false);
    sensor.readAndPublishData();

    expect(mockMqttClient.publish).toHaveBeenCalled();

    const [topic, payload] = (mockMqttClient.publish as jest.Mock).mock.calls[0];
    const data = JSON.parse(payload);

    expect(topic).toBe(sensor.getTopic());
    const value = parseFloat(data.value);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  it("should increase water level if water pump is active", () => {
    sensor.setWaterPumpState(true);
    sensor.setWaterLevel(40);

    sensor.readAndPublishData();

    expect(sensor.getWaterLevel()).toBeGreaterThan(40);
  });
});