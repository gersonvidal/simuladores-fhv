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
exports.HumiditySensor = void 0;
var Sensor_js_1 = require("../Sensor.js"); // Asegúrate de importar correctamente la clase base
var HumiditySensor = /** @class */ (function (_super) {
    __extends(HumiditySensor, _super);
    function HumiditySensor(mqttClient, greenhouseId) {
        return _super.call(this, mqttClient, greenhouseId, "humidity") || this; // Llamada al constructor de la clase base
    }
    HumiditySensor.prototype.readAndPublishData = function () {
        var humidity = (Math.random() * (90 - 65) + 65).toFixed(2);
        console.log("\uD83D\uDEBF Humedad medida: ".concat(humidity, "%"));
        this.mqttClient.publish(this.topic, JSON.stringify({ value: humidity }));
    };
    return HumiditySensor;
}(Sensor_js_1.Sensor));
exports.HumiditySensor = HumiditySensor;
