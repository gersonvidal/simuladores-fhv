export class LightSensor {
    constructor(mqttClient) {
        this.mqttClient = mqttClient;
        this.topic = "sensors/light";
    }
    readData() {
        const luminosity = Math.floor(Math.random() * 1000); // Medida en lux
        console.log(`Luminosidad: ${luminosity} lux`);
        this.mqttClient.publish(this.topic, JSON.stringify({ value: luminosity }));
    }
    getTopic() {
        return this.topic;
    }
}
