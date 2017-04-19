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
var Ecriture = (function (_super) {
    __extends(Ecriture, _super);
    function Ecriture(params) {
        var _this = _super.call(this, params) || this;
        _this.dateLet = params.dateLet || null;
        _this.ecritureDate = params.ecritureDate || null;
        _this.libelle = params.libelle || null;
        _this.ecritureLet = params.ecritureLet || null;
        _this.pieceRef = params.pieceRef || null;
        _this.pieceDate = params.pieceDate || null;
        _this.validDate = params.validDate || null;
        _this.lignes = params.lignes || [];
        return _this;
    }
    Ecriture.prototype.addLigne = function (l) {
        this.lignes.push(l);
    };
    Ecriture.prototype.checkEquilibre = function () {
        if (this.lignes.length < 1) {
            return true;
        }
        else if (this.lignes.length === 1) {
            return false;
        }
        else {
            var totalDebit = 0;
            var totalCredit = 0;
            this.lignes.forEach(function (l) {
                totalDebit += l.debit;
                totalCredit += l.credit;
            }, this);
            return totalDebit === totalCredit;
        }
    };
    Object.defineProperty(Ecriture.prototype, "equilibre", {
        get: function () {
            return this.checkEquilibre();
        },
        enumerable: true,
        configurable: true
    });
    return Ecriture;
}(base_1.default.BaseModel));
exports.Ecriture = Ecriture;
;
