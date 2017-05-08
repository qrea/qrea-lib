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
var Exercice = (function (_super) {
    __extends(Exercice, _super);
    function Exercice(params) {
        var _this = _super.call(this, params) || this;
        _this.cloture = params.cloture || null;
        _this.duree = params.duree || 12;
        _this.journaux = params.journaux || new Array();
        return _this;
    }
    Exercice.prototype.getJournalByCode = function (code) {
        var journal = null;
        this.journaux.forEach(function (j) {
            if (j.code === code)
                journal = j;
        });
        return journal;
    };
    Exercice.prototype.getSolde = function (c, filter) {
        if (filter === void 0) { filter = null; }
        var numero = c;
        var solde = 0;
        this.journaux.forEach(function (j) {
            solde += j.getSolde(c, filter);
        });
        return solde;
    };
    return Exercice;
}(base_1.default.BaseModel));
exports.Exercice = Exercice;
