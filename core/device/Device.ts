import { IMqttClient } from "../mqtt/IMqttClient"; // Asegúrate de que la ruta sea correcta

export abstract class Device {
    protected mqttClient: IMqttClient;
    protected greenhouseId: string;
    protected topic: string;

    constructor(mqttClient: IMqttClient, greenhouseId: string, topic: string) {
        this.mqttClient = mqttClient;
        this.greenhouseId = greenhouseId; 
        this.topic = topic;
    }

    getMqttClient(): IMqttClient {
        return this.mqttClient;
    }

    getGreenhouseId(): string {
        return this.greenhouseId;
    }

    getTopic(): string {
        return this.topic;
    }
}
