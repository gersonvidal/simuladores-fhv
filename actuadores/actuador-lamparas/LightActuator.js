export class LightActuator {
    constructor(mqttClient) {
        this.mqttClient = mqttClient;
        this.topic = "actuators/light";
    } // reemplazar `any` con `IMQTTClient`
    executeAction(command) {
        console.log(`Lámpara ${command === "ON" ? "encendida" : "apagada"}`);
    }
    getTopic() {
        return this.topic;
    }
}
