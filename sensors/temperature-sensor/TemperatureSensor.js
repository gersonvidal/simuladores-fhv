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
exports.TemperatureSensor = void 0;
var Sensor_js_1 = require("../Sensor.js");
var TemperatureSensor = /** @class */ (function (_super) {
    __extends(TemperatureSensor, _super);
    function TemperatureSensor(mqttClient, greenhouseId) {
        return _super.call(this, mqttClient, greenhouseId, "temperature") || this;
    }
    TemperatureSensor.prototype.readAndPublishData = function () {
        var temperature = (Math.random() * (36 - 22) + 22).toFixed(2);
        console.log("\u2600\uFE0F Temperatura medida: ".concat(temperature, "\u00B0C"));
        this.mqttClient.publish(this.topic, JSON.stringify({ value: temperature }));
    };
    return TemperatureSensor;
}(Sensor_js_1.Sensor));
exports.TemperatureSensor = TemperatureSensor;
