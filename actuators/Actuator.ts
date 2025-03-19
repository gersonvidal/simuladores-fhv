// actuators/Actuator.ts
import { Device } from "../core/device/Device.js";
import { IMqttClient } from "../core/mqtt/IMqttClient"; // Asegúrate de que la ruta sea correcta

export abstract class Actuator extends Device {
    constructor(
        mqttClient: IMqttClient,
        greenhouseId: string,
        actuatorType: string
    ) {
        super(
            mqttClient,
            greenhouseId,
            `greenhouse/${greenhouseId}/actuator/${actuatorType}`
        );
        this.subscribeToTopic();
    }

    public subscribeToTopic(): void {
        this.mqttClient.subscribe(this.getTopic(), (message: String) => {
            this.executeAction(message.toString()); 
        });
    }

    abstract executeAction(command: string): void;
}