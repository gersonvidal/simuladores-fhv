import { MqttClient } from "../core/mqtt/MqttClient"

export abstract class DecisionManager {
    protected mqttClient: MqttClient;

    subscribeToSensors(): void {}
}