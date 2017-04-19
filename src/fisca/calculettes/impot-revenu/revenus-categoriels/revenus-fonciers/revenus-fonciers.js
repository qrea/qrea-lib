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
var RevenusCategoriels = require("../revenus-categoriels");
exports.CONSTANTES_RF_2015 = {
    MAXI_DEFICIT_IMPUTABLE: 10700,
    ABATTEMENT_MICRO_FONCIER: 0.3,
    PLAFOND_MICRO: 15300
};
var regimesFonciers;
(function (regimesFonciers) {
    regimesFonciers[regimesFonciers["micro"] = 0] = "micro";
    regimesFonciers[regimesFonciers["reel"] = 1] = "reel";
})(regimesFonciers = exports.regimesFonciers || (exports.regimesFonciers = {}));
var RevenusFonciers = (function (_super) {
    __extends(RevenusFonciers, _super);
    function RevenusFonciers() {
        var _this = _super.call(this) || this;
        _this.categorie = 'Revenus fonciers';
        _this.categorieShort = 'RF';
        _this._regime = 0;
        _this._revenuBrut = 0;
        _this._interetsEmprunt = 0;
        _this._chargesDeductibles = 0;
        _this._travaux = 0;
        _this._deficitReportable = 0;
        _this._interetsEmpruntReportable = 0;
        return _this;
    }
    Object.defineProperty(RevenusFonciers.prototype, "description", {
        get: function () {
            var d = '';
            if (this.revenuNet < 0) {
                d += 'Déficit foncier ' + this.revenuNet;
            }
            else {
                d += 'Revenu foncier ' + this.revenuNet;
            }
            return d;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenusFonciers.prototype, "regime", {
        get: function () {
            return this._regime;
        },
        set: function (v) {
            this._regime = v;
            this.calcuerRevenuNet();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenusFonciers.prototype, "revenuBrut", {
        get: function () {
            return this._revenuBrut;
        },
        set: function (v) {
            this._revenuBrut = v;
            if (this._revenuBrut > exports.CONSTANTES_RF_2015['PLAFOND_MICRO']) {
                this.regime = regimesFonciers.reel;
            }
            this.calcuerRevenuNet();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenusFonciers.prototype, "abattement", {
        get: function () {
            if (this.regime === regimesFonciers.micro) {
                return Math.round(this.revenuBrut * exports.CONSTANTES_RF_2015['ABATTEMENT_MICRO_FONCIER']);
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenusFonciers.prototype, "interetsEmprunt", {
        get: function () {
            return this._interetsEmprunt;
        },
        set: function (v) {
            this._interetsEmprunt = v;
            this.calcuerRevenuNet();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenusFonciers.prototype, "chargesDeductibles", {
        get: function () {
            return this._chargesDeductibles;
        },
        set: function (v) {
            this._chargesDeductibles = v;
            this.calcuerRevenuNet();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenusFonciers.prototype, "travaux", {
        get: function () {
            return this._travaux;
        },
        set: function (v) {
            this._travaux = v;
            this.calcuerRevenuNet();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenusFonciers.prototype, "deficitReportable", {
        get: function () {
            return this._deficitReportable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenusFonciers.prototype, "interetsEmpruntReportable", {
        get: function () {
            return this._interetsEmpruntReportable;
        },
        enumerable: true,
        configurable: true
    });
    RevenusFonciers.prototype.calcuerRevenuNet = function () {
        if (this.regime === regimesFonciers.micro) {
            this.revenuNet = Math.round(this.revenuBrut * (1 - exports.CONSTANTES_RF_2015['ABATTEMENT_MICRO_FONCIER']));
        }
        else {
            var r = this.revenuBrut;
            r -= this.interetsEmprunt;
            if (r < 0) {
                this._interetsEmpruntReportable = Math.abs(r);
                r = 0;
            }
            else {
                this._interetsEmpruntReportable = 0;
            }
            r -= this.chargesDeductibles;
            r -= this.travaux;
            if (r < -10700) {
                this._deficitReportable = Math.abs(r) - 10700;
                r = -10700;
            }
            else {
                this._deficitReportable = 0;
            }
            this.revenuNet = r;
        }
    };
    return RevenusFonciers;
}(RevenusCategoriels.RevenuCategoriel));
exports.RevenusFonciers = RevenusFonciers;
