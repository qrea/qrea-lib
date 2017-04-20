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
var base_1 = require("../../../../base/base");
var proprietaireRevenu;
(function (proprietaireRevenu) {
    proprietaireRevenu[proprietaireRevenu["principal"] = 0] = "principal";
    proprietaireRevenu[proprietaireRevenu["conjoint"] = 1] = "conjoint";
    proprietaireRevenu[proprietaireRevenu["autre"] = 2] = "autre";
})(proprietaireRevenu = exports.proprietaireRevenu || (exports.proprietaireRevenu = {}));
var RevenuCategoriel = (function (_super) {
    __extends(RevenuCategoriel, _super);
    function RevenuCategoriel() {
        var _this = _super.call(this) || this;
        _this._revenuNet = 0;
        _this.revenuBrut = 0;
        return _this;
    }
    Object.defineProperty(RevenuCategoriel.prototype, "revenuNet", {
        get: function () {
            return this._revenuNet;
        },
        set: function (v) {
            if (v !== this._revenuNet) {
                var old = this._revenuNet;
                this._revenuNet = v;
                if (this.handler)
                    this.handler.call(this, old, v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevenuCategoriel.prototype, "proprietaireLibelle", {
        get: function () {
            switch (this.proprietaire) {
                case proprietaireRevenu.autre:
                    return 'Autre';
                case proprietaireRevenu.conjoint:
                    return 'Conjoint';
                case proprietaireRevenu.principal:
                    return 'Principal';
                default:
                    return 'Non défini';
            }
        },
        enumerable: true,
        configurable: true
    });
    return RevenuCategoriel;
}(base_1.default.BaseModel));
exports.RevenuCategoriel = RevenuCategoriel;
var traitements_salaires_1 = require("./traitements-salaires/traitements-salaires");
exports.TraitementsSalaires = traitements_salaires_1.TraitementsSalaires;
exports.typeTraitementSalaire = traitements_salaires_1.typeTraitementSalaire;
var revenus_fonciers_1 = require("./revenus-fonciers/revenus-fonciers");
exports.RevenusFonciers = revenus_fonciers_1.RevenusFonciers;
var RevenusCapitauxMobiliers = (function (_super) {
    __extends(RevenusCapitauxMobiliers, _super);
    function RevenusCapitauxMobiliers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RevenusCapitauxMobiliers;
}(RevenuCategoriel));
exports.RevenusCapitauxMobiliers = RevenusCapitauxMobiliers;
var PlusValues = (function (_super) {
    __extends(PlusValues, _super);
    function PlusValues() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PlusValues;
}(RevenuCategoriel));
exports.PlusValues = PlusValues;
var RemunerationDirigeant62 = (function (_super) {
    __extends(RemunerationDirigeant62, _super);
    function RemunerationDirigeant62() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RemunerationDirigeant62;
}(RevenuCategoriel));
exports.RemunerationDirigeant62 = RemunerationDirigeant62;
var BeneficesNonCommerciaux = (function (_super) {
    __extends(BeneficesNonCommerciaux, _super);
    function BeneficesNonCommerciaux() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BeneficesNonCommerciaux;
}(RevenuCategoriel));
exports.BeneficesNonCommerciaux = BeneficesNonCommerciaux;
var BeneficesCommerciaux = (function (_super) {
    __extends(BeneficesCommerciaux, _super);
    function BeneficesCommerciaux() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BeneficesCommerciaux;
}(RevenuCategoriel));
exports.BeneficesCommerciaux = BeneficesCommerciaux;
var BeneficesAgricoles = (function (_super) {
    __extends(BeneficesAgricoles, _super);
    function BeneficesAgricoles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BeneficesAgricoles;
}(RevenuCategoriel));
exports.BeneficesAgricoles = BeneficesAgricoles;
