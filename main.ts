import { HumiditySensor } from "./sensores/sensor-humedad/HumiditySensor";
import { LightSensor } from "./sensores/sensor-luminosidad/LightSensor";
import { WaterLevelSensor } from "./sensores/sensor-nivel-de-agua/WaterLevelSensor";
import { TemperatureSensor } from "./sensores/sensor-temperatura/TemperatureSensor";

class Simulacion {
  private intervalId: ReturnType<typeof setInterval> | null = null; // Para manejar el intervalo de simulación

  // Método para ejecutar la simulación de todos los sensores
  runSimulation(): void {
    const temperatureSensor = new TemperatureSensor();
    const humiditySensor = new HumiditySensor();
    const waterLevelSensor = new WaterLevelSensor();
    const lightSensor = new LightSensor();

    const now = new Date();

    console.log("Fecha y Hora: " + now.toString())

    // Llamamos a los métodos de lectura de datos de cada sensor
    temperatureSensor.readData();
    humiditySensor.readData();
    waterLevelSensor.readData();
    lightSensor.readData();

    console.log("---------------------------------");
  }

  startSimulation(): void {
    this.intervalId = setInterval(() => {
      this.runSimulation();
    }, 2500); // Cada 2500 ms (2.5 segundos)
  }

  // Método para detener la simulación
  stopSimulation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Detiene la simulación
      this.intervalId = null;
    }
  }
}

// Cuando el DOM esté listo, se conecta al botón y ejecuta la simulación.
window.addEventListener("DOMContentLoaded", () => {
    const simulation = new Simulacion();

    const startSimulationButton = document.getElementById("startSimulationButton") as HTMLButtonElement;
    let isSimulationRunning = false; // Variable para controlar si la simulación está corriendo

    if (startSimulationButton) {
        startSimulationButton.addEventListener("click", () => {
            if (isSimulationRunning) {
                simulation.stopSimulation(); // Detenemos la simulación
                startSimulationButton.textContent = "Iniciar Simulación General"; // Cambiar texto del botón
            } else {
                simulation.startSimulation(); // Iniciamos la simulación
                startSimulationButton.textContent = "Detener Simulación"; // Cambiar texto del botón
            }

            isSimulationRunning = !isSimulationRunning; // Alternar estado
        });
    }
});
