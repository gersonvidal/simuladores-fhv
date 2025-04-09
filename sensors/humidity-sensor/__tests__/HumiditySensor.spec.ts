import { HumiditySensor } from "../HumiditySensor";
import { IMqttClient } from "../../../core/mqtt/IMqttClient";

// Subclase para pruebas, controlamos el estado del actuador
class TestHumiditySensor extends HumiditySensor {
  private sprinklerActive: boolean = false;

  setSprinklerState(state: boolean) {
    this.sprinklerActive = state;
  }

  protected override isActuatorActive(actuatorType: string): boolean {
    return this.sprinklerActive;
  }

  setHumidity(value: number): void {
    (this as any).humidity = value;
  }

  getHumidity(): number {
    return (this as any).humidity;
  }
}

describe("HumiditySensor", () => {
  let mockMqttClient: IMqttClient;
  let sensor: TestHumiditySensor;
  const greenhouseId = "greenhouse-1";

  beforeEach(() => {
    mockMqttClient = {
      publish: jest.fn(),
    } as unknown as IMqttClient;

    sensor = new TestHumiditySensor(mockMqttClient, greenhouseId, "humidity");
  });

  it("should publish a humidity value between 65 and 90", () => {
    sensor.setSprinklerState(false);
    sensor.readAndPublishData();

    expect(mockMqttClient.publish).toHaveBeenCalled();

    const [topic, payload] = (mockMqttClient.publish as jest.Mock).mock
      .calls[0];
    const data = JSON.parse(payload);

    expect(topic).toBe(sensor.getTopic());
    expect(parseFloat(data.value)).toBeGreaterThanOrEqual(65);
    expect(parseFloat(data.value)).toBeLessThanOrEqual(90);
  });

  it("should increase humidity if sprinkler is active", () => {
    sensor.setSprinklerState(true);
    sensor.setHumidity(70);

    sensor.readAndPublishData();

    expect(sensor.getHumidity()).toBeGreaterThan(70);
  });
});
