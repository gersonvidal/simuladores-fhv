"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationActuator = void 0;
// actuators/notification-actuator/NotificationActuator.ts
var Actuator_js_1 = require("../Actuator.js");
var NotificationActuator = /** @class */ (function (_super) {
    __extends(NotificationActuator, _super);
    function NotificationActuator(mqttClient, greenhouseId) {
        // Llama a super() para inicializar la clase base
        var _this = _super.call(this, mqttClient, greenhouseId, "notification", "temperature") || this;
        _this.lastCommand = null;
        return _this;
    }
    NotificationActuator.prototype.handleSensorData = function (message) {
        try {
            var data = JSON.parse(message);
            var temperature = parseFloat(data.value);
            if (isNaN(temperature)) {
                console.error("Valor inválido en sensor de temperatura:", message);
                return;
            }
            // Si la temperatura está fuera del rango (por ejemplo, menor a 24°C o mayor a 33°C), se envía una notificación.
            if (temperature < 24 || temperature > 33) {
                this.executeAction("Alerta de temperatura: ".concat(temperature, "\u00B0C"));
            }
            else {
                console.log("Temperatura normal: ".concat(temperature, "\u00B0C"));
            }
        }
        catch (error) {
            console.error("Error procesando sensor de temperatura:", error);
        }
    };
    NotificationActuator.prototype.executeAction = function (command) {
        if (command === this.lastCommand)
            return; // 👈 Evita spam si el estado no cambió
        this.lastCommand = command;
        console.log("\u2600\uFE0F Notificaci\u00F3n enviada: ".concat(command));
        this.mqttClient.publish(this.getTopic(), command); // Publica el comando
    };
    return NotificationActuator;
}(Actuator_js_1.Actuator));
exports.NotificationActuator = NotificationActuator;
