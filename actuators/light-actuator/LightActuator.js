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
exports.LightActuator = void 0;
// actuators/light-actuator/LightActuator.ts
var Actuator_js_1 = require("../Actuator.js");
var LightActuator = /** @class */ (function (_super) {
    __extends(LightActuator, _super);
    function LightActuator(mqttClient, greenhouseId) {
        var _this = _super.call(this, mqttClient, greenhouseId, "light", "light") || this; // "light" es el tipo de actuador y el otro "light" es el tipo del sensor
        _this.lastCommand = null;
        return _this;
    }
    LightActuator.prototype.handleSensorData = function (message) {
        try {
            var data = JSON.parse(message);
            // Se espera que el sensor publique {"value": <número>}
            var luminosity = parseFloat(data.value);
            if (isNaN(luminosity)) {
                console.error("Valor inválido en sensor de luz:", message);
                return;
            }
            // Si la luminosidad es menor a 300 lux, se considera insuficiente y se enciende la luz.
            if (luminosity < 300) {
                this.executeAction("ON");
            }
            else {
                this.executeAction("OFF");
            }
        }
        catch (error) {
            console.error("Error procesando sensor de luz:", error);
        }
    };
    LightActuator.prototype.executeAction = function (command) {
        if (command === this.lastCommand)
            return; // 👈 Evita spam si el estado no cambió
        this.lastCommand = command;
        console.log("\uD83D\uDCA1 L\u00E1mpara ".concat(command === "ON" ? "encendida" : "apagada"));
        this.mqttClient.publish(this.getTopic(), command); // Publica el comando
    };
    return LightActuator;
}(Actuator_js_1.Actuator));
exports.LightActuator = LightActuator;
