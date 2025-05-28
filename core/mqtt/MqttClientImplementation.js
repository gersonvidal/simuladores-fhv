"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttClientImplementation = void 0;
var mqtt_1 = require("mqtt");
var MqttClientImplementation = /** @class */ (function () {
    function MqttClientImplementation(brokerUrl) {
        this.brokerUrl = brokerUrl;
        this.client = mqtt_1.default.connect(this.brokerUrl);
    }
    MqttClientImplementation.prototype.connect = function () {
        this.client.on("connect", function () {
            console.log("Conectado al servidor MQTT");
        });
        this.client.on("error", function (error) {
            console.error("Error de conexión MQTT:", error);
        });
    };
    MqttClientImplementation.prototype.publish = function (topic, message) {
        this.client.publish(topic, message, function (error) {
            if (error) {
                console.error("Error publicando en ".concat(topic, ":"), error);
            }
            else {
                console.log("Publicado en ".concat(topic, ": ").concat(message));
            }
        });
    };
    MqttClientImplementation.prototype.subscribe = function (topic, callback) {
        this.client.subscribe(topic, function (error) {
            if (error) {
                console.error("Error suscribi\u00E9ndose a ".concat(topic, ":"), error);
            }
            else {
                console.log("Suscrito a ".concat(topic));
            }
        });
        this.client.on("message", function (receivedTopic, message) {
            if (receivedTopic === topic) {
                callback(message.toString());
            }
        });
    };
    MqttClientImplementation.prototype.disconnect = function () {
        this.client.end();
        console.log("Desconectado del servidor MQTT");
    };
    return MqttClientImplementation;
}());
exports.MqttClientImplementation = MqttClientImplementation;
