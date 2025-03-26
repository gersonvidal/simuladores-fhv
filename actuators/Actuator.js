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
exports.Actuator = void 0;
// actuators/Actuator.ts
var Device_js_1 = require("../core/device/Device.js");
var Actuator = /** @class */ (function (_super) {
    __extends(Actuator, _super);
    function Actuator(mqttClient, greenhouseId, actuatorType, sensorType) {
        var _this = _super.call(this, mqttClient, greenhouseId, "greenhouse/".concat(greenhouseId, "/actuator/").concat(actuatorType)) || this;
        _this.sensorTopic = "greenhouse/".concat(greenhouseId, "/sensor/").concat(sensorType);
        _this.subscribeToTopic();
        _this.subscribeToSensorTopic();
        return _this;
    }
    Actuator.prototype.subscribeToTopic = function () {
        var _this = this;
        this.mqttClient.subscribe(this.getTopic(), function (message) {
            _this.executeAction(message.toString());
        });
    };
    Actuator.prototype.subscribeToSensorTopic = function () {
        var _this = this;
        this.mqttClient.subscribe(this.sensorTopic, function (message) {
            _this.handleSensorData(message.toString());
        });
    };
    return Actuator;
}(Device_js_1.Device));
exports.Actuator = Actuator;
