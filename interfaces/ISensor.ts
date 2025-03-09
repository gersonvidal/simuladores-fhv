export interface ISensor {
    readData(): void; // Método para obtener lecturas del sensor
    getTopic(): string; // Método para obtener el tópico MQTT asociado al sensor
}