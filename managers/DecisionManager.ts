import { mqttClient } from "../core/mqtt/MqttClient";

export abstract class DecisionManager {
    protected mqttClient: typeof mqttClient;  // Usar typeof para referirse al tipo de mqttClient

    subscribeToSensors(): void {}
}
