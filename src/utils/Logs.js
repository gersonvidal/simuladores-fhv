"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
// src/utils/Logger.ts
var Logs = /** @class */ (function () {
    function Logs() {
        this.logs = [];
    }
    // Método para agregar un evento al log
    Logs.prototype.log = function (event) {
        var timestamp = new Date().toLocaleString(); // Agrega una marca de tiempo
        this.logs.push("[".concat(timestamp, "] ").concat(event));
    };
    // Método para mostrar el historial completo
    Logs.prototype.showLogs = function () {
        console.log("Historial de eventos:");
        this.logs.forEach(function (log) { return console.log(log); });
    };
    return Logs;
}());
exports.Logs = Logs;
