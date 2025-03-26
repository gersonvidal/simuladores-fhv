import { Device } from "../core/device/Device.js";
import { IMqttClient } from "../core/mqtt/IMqttClient";

export abstract class Actuator extends Device {
    constructor(mqttClient: IMqttClient, greenhouseId: string, actuatorType: string) {
        super(mqttClient, greenhouseId, `greenhouse/${greenhouseId}/actuator/${actuatorType}`);
        this.subscribeToTopic();
    }

    public subscribeToTopic(): void {
        this.mqttClient.subscribe(this.getTopic(), (message: string) => {
            const { action } = JSON.parse(message); // Asegúrate que el mensaje es un JSON válido
            console.log(`Comando recibido en ${this.getTopic()}: ${action}`);
            this.executeAction(action);
        });
    }

    abstract executeAction(command: string): void;
}
