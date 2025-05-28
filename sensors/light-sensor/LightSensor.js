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
exports.LightSensor = void 0;
var Sensor_js_1 = require("../Sensor.js");
var LightSensor = /** @class */ (function (_super) {
    __extends(LightSensor, _super);
    function LightSensor(mqttClient, greenhouseId) {
        return _super.call(this, mqttClient, greenhouseId, "light") || this;
    }
    LightSensor.prototype.readAndPublishData = function () {
        var luminosity = Math.floor(Math.random() * 1000); // Medida en lux
        console.log("\uD83D\uDCA1 Luminosidad: ".concat(luminosity, " lux"));
        this.mqttClient.publish(this.topic, JSON.stringify({ value: luminosity }));
    };
    return LightSensor;
}(Sensor_js_1.Sensor));
exports.LightSensor = LightSensor;
