"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mqttClient = exports.MqttClientImplementation = void 0;
var MqttClientImplementation = /** @class */ (function () {
    function MqttClientImplementation(brokerUrl) {
        this.brokerUrl = brokerUrl;
    }
    MqttClientImplementation.prototype.connect = function () {
        console.log("Conectado al servidor MQTT en ".concat(this.brokerUrl));
    };
    MqttClientImplementation.prototype.publish = function (topic, message) {
        console.log("Publicando en ".concat(topic, ": ").concat(message));
    };
    MqttClientImplementation.prototype.subscribe = function (topic, callback) {
        console.log("Suscrito a ".concat(topic));
        setTimeout(function () {
            callback("Mock message");
        }, 1000);
    };
    MqttClientImplementation.prototype.disconnect = function () {
        console.log("Desconectado del servidor MQTT");
    };
    return MqttClientImplementation;
}());
exports.MqttClientImplementation = MqttClientImplementation;
exports.mqttClient = new MqttClientImplementation("mqtt://localhost:1883"); // Instancia de MqttClientImplementation
