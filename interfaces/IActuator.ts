
export interface IActuator {
    executeAction(command: string): void; // Ejecutar la acción correspondiente
    getTopic(): string; // Método para obtener el tópico MQTT asociado al actuador
}