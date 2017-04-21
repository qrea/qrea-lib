"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("../../../base/base");
var Compte = (function (_super) {
    __extends(Compte, _super);
    function Compte(params) {
        var _this = _super.call(this, params) || this;
        _this.libelle = params.libelle || null;
        _this.numero = params.numero || null;
        return _this;
    }
    return Compte;
}(base_1.default.BaseModel));
exports.Compte = Compte;
