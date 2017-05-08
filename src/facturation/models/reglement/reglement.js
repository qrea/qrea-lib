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
var Reglement = (function (_super) {
    __extends(Reglement, _super);
    function Reglement(params) {
        var _this = _super.call(this, params) || this;
        _this.delai = params.delai;
        _this.montant = params.montant;
        _this.pourcentage = params.pourcentage;
        _this.finDeMois = params.finDeMois;
        _this.paye = params.paye;
        return _this;
    }
    return Reglement;
}(base_1.default.BaseModel));
exports.Reglement = Reglement;
