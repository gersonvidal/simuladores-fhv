export class WaterPumpActuator {
    constructor(mqttClient) {
        this.mqttClient = mqttClient;
        this.topic = "actuators/waterPump";
    } // reemplazar `any` con `IMQTTClient`
    executeAction(command) {
        console.log(`Bomba de agua ${command === "ON" ? "activada" : "desactivada"}`);
    }
    getTopic() {
        return this.topic;
    }
}
