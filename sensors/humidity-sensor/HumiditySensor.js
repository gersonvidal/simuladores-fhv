export class HumiditySensor {
    constructor(mqttClient) {
        this.mqttClient = mqttClient;
        this.topic = "sensors/humidity";
    }
    readData() {
        const humidity = (Math.random() * (90 - 65) + 65).toFixed(2);
        console.log(`Humedad medida: ${humidity}%`);
        this.mqttClient.publish(this.topic, JSON.stringify({ value: humidity }));
    }
    getTopic() {
        return this.topic;
    }
}
