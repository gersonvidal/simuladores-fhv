// src/utils/Logger.ts
export class Logs {
    private logs: string[] = [];
  
    // Método para agregar un evento al log
    log(event: string): void {
      const timestamp = new Date().toLocaleString(); // Agrega una marca de tiempo
      this.logs.push(`[${timestamp}] ${event}`);
    }
  
    // Método para mostrar el historial completo
    showLogs(): void {
      console.log("Historial de eventos:");
      this.logs.forEach((log) => console.log(log));
    }
  }