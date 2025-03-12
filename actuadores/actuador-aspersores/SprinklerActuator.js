export class SprinklerActuator {
    constructor(mqttClient) {
        this.mqttClient = mqttClient;
        this.topic = "actuators/sprinkler";
    } //reemplazar `any` con `IMQTTClient` si tienes la interfaz
    executeAction(command) {
        console.log(`Aspersor ${command === "ON" ? "activado" : "desactivado"}`);
    }
    getTopic() {
        return this.topic;
    }
}
