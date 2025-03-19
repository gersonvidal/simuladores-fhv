// src/core/mqtt/MqttClient.ts
export interface IMqttClient {
    connect(): void;
    publish(topic: string, message: string): void;
    subscribe(topic: string, callback: (message: string) => void): void;
    disconnect(): void;
  }
  
  export class MqttClientImplementation implements IMqttClient {
    private brokerUrl: string;
  
    constructor(brokerUrl: string) {
      this.brokerUrl = brokerUrl;
    }
  
    connect(): void {
      console.log(`Conectado al servidor MQTT en ${this.brokerUrl}`);
    }
  
    publish(topic: string, message: string): void {
      console.log(`Publicando en ${topic}: ${message}`);
    }
  
    subscribe(topic: string, callback: (message: string) => void): void {
      console.log(`Suscrito a ${topic}`);
      setTimeout(() => {
        callback("Mock message");
      }, 1000);
    }
  
    disconnect(): void {
      console.log("Desconectado del servidor MQTT");
    }
  }
  
  export const mqttClient = new MqttClientImplementation("mqtt://localhost:1883"); // Instancia de MqttClientImplementation
  