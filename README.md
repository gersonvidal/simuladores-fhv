# 🧪 Simulador de Condiciones Ambientales para Invernadero

Este proyecto consiste en un sistema de simulación que emula el comportamiento de sensores y actuadores conectados mediante el protocolo **MQTT**, diseñado para monitorear y controlar las condiciones ambientales de un invernadero automatizado.

## 🚀 Funcionalidades principales

- Simulación de sensores de:
  - Temperatura
  - Humedad
  - Nivel de agua
  - Luminosidad
- Emulación de actuadores como:
  - Bomba de agua
  - Aspersor
  - Luces
  - Notificador de alertas
  - Ventilador
- Comunicación mediante **MQTT** entre dispositivos simulados
- Control automático o manual de los actuadores
- Visualización e interacción en interfaz web con reflejo en los emuladores

## 🧱 Estructura del proyecto

📁/
├── core/ Clases base y cliente MQTT
├── sensors/ Interfaz e implementaciones de sensores
├── actuators/ Interfaz e implementaciones de actuadores
├── factories / Interfaz e implementaciones de factorias para sensores y actuadores
└── main.ts # Punto de entrada principal