export class WaterLevelSensor {
    constructor(mqttClient) {
        this.mqttClient = mqttClient;
        this.topic = "sensors/waterLevel";
    }
    readData() {
        const level = Math.floor(Math.random() * 101); // Nivel entre 0 y 100
        console.log(`Nivel de agua: ${level}%`);
        this.mqttClient.publish(this.topic, JSON.stringify({ value: level }));
    }
    getTopic() {
        return this.topic;
    }
}
