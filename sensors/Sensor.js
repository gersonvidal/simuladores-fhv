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
exports.Sensor = void 0;
var Device_js_1 = require("../core/device/Device.js");
var Sensor = /** @class */ (function (_super) {
    __extends(Sensor, _super);
    function Sensor(mqttClient, // Usa la interfaz IMqttClient en vez de la instancia directamente
    greenhouseId, sensorType) {
        var _this = _super.call(this, mqttClient, greenhouseId, "greenhouse/".concat(greenhouseId, "/sensor/").concat(sensorType)) || this;
        _this.value = 0;
        return _this;
    }
    Sensor.prototype.readAndPublishData = function () { };
    Sensor.prototype.getValue = function () {
        return this.value;
    };
    return Sensor;
}(Device_js_1.Device));
exports.Sensor = Sensor;
