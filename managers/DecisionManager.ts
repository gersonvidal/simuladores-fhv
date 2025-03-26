import { IMqttClient } from "../core/mqtt/IMqttClient"; // Importa la interfaz correctamente

export abstract class DecisionManager {
    protected mqttClient: IMqttClient;  // Usa la interfaz IMqttClient

    constructor(mqttClient: IMqttClient) {
        this.mqttClient = mqttClient;  // Asigna el cliente MQTT
    }

    abstract subscribeToSensors(): void;
}
