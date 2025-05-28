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
exports.SprinklerActuator = void 0;
var Actuator_js_1 = require("../Actuator.js");
var SprinklerActuator = /** @class */ (function (_super) {
    __extends(SprinklerActuator, _super);
    function SprinklerActuator(mqttClient, greenhouseId) {
        // Llama a super() para inicializar la clase base
        var _this = _super.call(this, mqttClient, greenhouseId, "sprinkler", "humidity") || this;
        _this.lastCommand = null;
        return _this;
    }
    SprinklerActuator.prototype.handleSensorData = function (message) {
        try {
            var data = JSON.parse(message);
            var humidity = parseFloat(data.value);
            if (isNaN(humidity)) {
                console.error("Valor inválido en sensor de humedad:", message);
                return;
            }
            // Si la humedad es menor a 70%, se activa el aspersor; de lo contrario, se desactiva.
            if (humidity < 70) {
                this.executeAction("ON");
            }
            else {
                this.executeAction("OFF");
            }
        }
        catch (error) {
            console.error("Error procesando sensor de humedad:", error);
        }
    };
    SprinklerActuator.prototype.executeAction = function (command) {
        if (command === this.lastCommand)
            return; // 👈 Evita spam si el estado no cambió
        this.lastCommand = command;
        console.log("\uD83D\uDEBF Aspersor ".concat(command === "ON" ? "activado" : "desactivado"));
        this.mqttClient.publish(this.getTopic(), command); // Publica el comando
    };
    return SprinklerActuator;
}(Actuator_js_1.Actuator));
exports.SprinklerActuator = SprinklerActuator;
