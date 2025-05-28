"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
var Device = /** @class */ (function () {
    function Device(mqttClient, greenhouseId, topic) {
        this.mqttClient = mqttClient;
        this.greenhouseId = greenhouseId;
        this.topic = topic;
    }
    Device.prototype.getMqttClient = function () {
        return this.mqttClient;
    };
    Device.prototype.getGreenhouseId = function () {
        return this.greenhouseId;
    };
    Device.prototype.getTopic = function () {
        return this.topic;
    };
    return Device;
}());
exports.Device = Device;
