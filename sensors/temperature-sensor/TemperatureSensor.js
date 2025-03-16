export class TemperatureSensor {
    constructor(mqttClient) {
        this.mqttClient = mqttClient;
        this.topic = "sensors/temperature";
    }
    readData() {
        const temperature = (Math.random() * (36 - 22) + 22).toFixed(2);
        console.log(`Temperatura medida: ${temperature}°C`);
        this.mqttClient.publish(this.topic, JSON.stringify({ value: temperature }));
    }
    getTopic() {
        return this.topic;
    }
}
