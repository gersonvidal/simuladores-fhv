// src/main.ts
import { HumiditySensor } from "./sensores/sensor-humedad/HumiditySensor.js";
import { LightSensor } from "./sensores/sensor-luminosidad/LightSensor.js";
import { WaterLevelSensor } from "./sensores/sensor-nivel-de-agua/WaterLevelSensor.js";
import { TemperatureSensor } from "./sensores/sensor-temperatura/TemperatureSensor.js";
import { SprinklerActuator } from "./actuadores/actuador-aspersores/SprinklerActuator.js";
import { LightActuator } from "./actuadores/actuador-lamparas/LightActuator.js";
import { WaterPumpActuator } from "./actuadores/actuador-bomba-de-agua/WaterPumpActuator.js";
import { NotificationActuator } from "./actuadores/actuador-notificaciones/NotificationActuator.js";
import { IMQTTClient } from "./interfaces/IMQTTClient.js";

// Simulación de un cliente MQTT
const mqttClient: IMQTTClient = {
  connect(): void {
      console.log("Conectado al broker MQTT.");
  },
  disconnect(): void {
      console.log("Desconectado del broker MQTT.");
  },
  publish(topic: string, message: string): void {
      console.log(`Publicando en ${topic}: ${message}`);
  },
  subscribe(topic: string, callback: (message: string) => void): void {
      console.log(`Suscrito al tópico ${topic}`);
      // Simular la recepción de mensajes MQTT
      setInterval(() => {
          const simulatedValue = Math.random() * 100; // Simula un valor aleatorio
          callback(JSON.stringify({ value: simulatedValue }));
      }, 3000); // Simula mensajes cada 3 segundos
  },
};

// Crear instancias de sensores y actuadores
const temperatureSensor = new TemperatureSensor(mqttClient);
const humiditySensor = new HumiditySensor(mqttClient);
const waterLevelSensor = new WaterLevelSensor(mqttClient);
const lightSensor = new LightSensor(mqttClient);

const sprinkler = new SprinklerActuator(mqttClient);
const light = new LightActuator(mqttClient);
const waterPump = new WaterPumpActuator(mqttClient);
const notification = new NotificationActuator(mqttClient);

// Suscribir los actuadores a los temas MQTT
mqttClient.subscribe("sensors/temperature", (message: string) => {
    const data = JSON.parse(message);
    const temperature = data.value;

    if (temperature < 18 || temperature > 25) { // Rango óptimo para cebada, avena y trigo
        notification.executeAction(`Temperatura crítica: ${temperature}°C`);
    }
});

mqttClient.subscribe("sensors/humidity", (message: string) => {
    const data = JSON.parse(message);
    const humidity = data.value;

    if (humidity < 60 || humidity > 70) { // Rango óptimo para cebada, trigo y sorgo
        sprinkler.executeAction("ON");
    } else {
        sprinkler.executeAction("OFF");
    }
});

mqttClient.subscribe("sensors/light", (message: string) => {
    const data = JSON.parse(message);
    const luminosity = data.value;

    if (luminosity < 9) { // Menos de 9 horas de luz
        light.executeAction("ON");
    } else {
        light.executeAction("OFF");
    }
});

mqttClient.subscribe("sensors/waterLevel", (message: string) => {
    const data = JSON.parse(message);
    const level = data.value;

    if (level < 50) { // Nivel de agua bajo
        waterPump.executeAction("ON");
    } else {
        waterPump.executeAction("OFF");
    }
});

class Simulacion {
  private intervalId: ReturnType<typeof setInterval> | null = null;

  runSimulation(): void {
    const now = new Date();
    console.log("Fecha y Hora: " + now.toString());

    // Leer datos de los sensores
    temperatureSensor.readData();
    humiditySensor.readData();
    waterLevelSensor.readData();
    lightSensor.readData();

    console.log("---------------------------------");
  }

  startSimulation(): void {
    this.intervalId = setInterval(() => {
      this.runSimulation();
    }, 2500);
  }

  stopSimulation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Verificar si estamos en un entorno de navegador
if (typeof window !== "undefined") {
    // Cuando el DOM esté listo, conecta el botón y ejecuta la simulación.
    window.addEventListener("DOMContentLoaded", () => {
      const simulation = new Simulacion();
  
      const startSimulationButton = document.getElementById("startSimulationButton") as HTMLButtonElement;
      let isSimulationRunning = false;
  
      if (startSimulationButton) {
          startSimulationButton.addEventListener("click", () => {
              if (isSimulationRunning) {
                  simulation.stopSimulation();
                  startSimulationButton.textContent = "Iniciar Simulación General";
              } else {
                  simulation.startSimulation();
                  startSimulationButton.textContent = "Detener Simulación";
              }
  
              isSimulationRunning = !isSimulationRunning;
          });
      }
    });
  } else {
    // Si estamos en Node.js, ejecutamos la simulación en la consola
    const simulation = new Simulacion();
    simulation.startSimulation();
  }
  