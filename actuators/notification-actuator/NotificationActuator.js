export class NotificationActuator {
    constructor(mqttClient) {
        this.mqttClient = mqttClient;
        this.topic = "actuators/notification";
    } //reemplazar `any` con `IMQTTClient`
    executeAction(command) {
        console.log(`Notificación enviada: ${command}`);
    }
    getTopic() {
        return this.topic;
    }
}
