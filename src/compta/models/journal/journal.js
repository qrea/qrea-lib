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
var Helpers = require("../../helpers/helpers");
var Journal = (function (_super) {
    __extends(Journal, _super);
    function Journal(params) {
        var _this = _super.call(this, params) || this;
        _this.code = params.code || null;
        _this.libelle = params.libelle || null;
        _this.ecritures = params.ecritures || new Array();
        return _this;
    }
    Journal.prototype.addEcriture = function (e) {
        if (!e.equilibre) {
            throw new Error('L\'écriture n\'est pas équilibrée');
        }
        else {
            this.ecritures.push(e);
        }
    };
    Journal.prototype.checkEquilibre = function () {
        if (!this.ecritures || this.ecritures.length === 0) {
            return true;
        }
        else if (this.ecritures.length === 1) {
            return false;
        }
        else {
            var test = true;
            this.ecritures.forEach(function (e) {
                if (!e.equilibre)
                    test = false;
            });
            return test;
        }
    };
    Journal.prototype.getSolde = function (c, filter) {
        if (filter === void 0) { filter = null; }
        var numero = c;
        var solde = 0;
        this.ecritures.forEach(function (e) {
            var testStart = false;
            if (!filter || !filter.start)
                testStart = true;
            if ((filter && filter.start) && filter.start <= e.ecritureDate)
                testStart = true;
            var testEnd = false;
            if (!filter || !filter.end)
                testEnd = true;
            if ((filter && filter.end) && filter.end >= e.ecritureDate)
                testEnd = true;
            e.lignes.forEach(function (l) {
                if (Helpers.numerosCompteEquals(l.compteNum, c) && testStart && testEnd) {
                    solde += l.debit;
                    solde += -l.credit;
                }
            });
        });
        return solde;
    };
    Object.defineProperty(Journal.prototype, "equilibre", {
        get: function () {
            return this.checkEquilibre();
        },
        enumerable: true,
        configurable: true
    });
    return Journal;
}(base_1.default.BaseModel));
exports.Journal = Journal;
;
