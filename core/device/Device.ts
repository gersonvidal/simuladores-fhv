export abstract class Device {
    protected mqttClient: MqttClient;
    protected greenhouseId: string;
    protected topic: string;

    constructor(mqttClient: MqttClient, greenhouseId: string, topic: string) {
        this.mqttClient = mqttClient;
        this.greenhouseId = greenhouseId; 
        this.topic = topic;
    }

    getMqttClient(): MqttClient {
        return this.mqttClient;
    }

    getGreenhouseId(): string {
        return this.greenhouseId;
    }

    getTopic(): string {
        return this.topic;
    }

}