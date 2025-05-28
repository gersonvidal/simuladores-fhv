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
exports.WaterPumpActuator = void 0;
// actuators/water-pump-actuator/WaterPumpActuator.ts
var Actuator_js_1 = require("../Actuator.js");
var WaterPumpActuator = /** @class */ (function (_super) {
    __extends(WaterPumpActuator, _super);
    function WaterPumpActuator(mqttClient, greenhouseId) {
        // Llama a super() para inicializar la clase base
        var _this = _super.call(this, mqttClient, greenhouseId, "waterPump", "water_level") || this;
        _this.lastCommand = null;
        return _this;
    }
    WaterPumpActuator.prototype.handleSensorData = function (message) {
        try {
            var data = JSON.parse(message);
            var waterLevel = parseFloat(data.value);
            if (isNaN(waterLevel)) {
                console.error("Valor inválido en sensor de nivel de agua:", message);
                return;
            }
            // Si el nivel de agua es menor a 30%, se activa la bomba; de lo contrario, se desactiva.
            if (waterLevel < 30) {
                this.executeAction("ON");
            }
            else {
                this.executeAction("OFF");
            }
        }
        catch (error) {
            console.error("Error procesando sensor de nivel de agua:", error);
        }
    };
    WaterPumpActuator.prototype.executeAction = function (command) {
        if (command === this.lastCommand)
            return; // 👈 Evita spam si el estado no cambió
        this.lastCommand = command;
        console.log("\uD83D\uDCA7 Bomba de agua ".concat(command === "ON" ? "activada" : "desactivada"));
        this.mqttClient.publish(this.getTopic(), command); // Publica el comando
    };
    return WaterPumpActuator;
}(Actuator_js_1.Actuator));
exports.WaterPumpActuator = WaterPumpActuator;
