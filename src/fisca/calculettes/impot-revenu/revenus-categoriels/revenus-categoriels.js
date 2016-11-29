var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../../base/base');
var RevenuCategoriel = (function (_super) {
    __extends(RevenuCategoriel, _super);
    function RevenuCategoriel() {
        _super.call(this);
        this._revenuNet = 0;
        this.revenuNetPrincipal = 0;
        this.revenuNetConjoint = 0;
        this.revenuNetAutres = 0;
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
    return RevenuCategoriel;
})(base_1.default.BaseModel);
exports.RevenuCategoriel = RevenuCategoriel;
var traitements_salaires_1 = require('./traitements-salaires/traitements-salaires');
exports.TraitementsSalaires = traitements_salaires_1.TraitementsSalaires;
var revenus_fonciers_1 = require('./revenus-fonciers/revenus-fonciers');
exports.RevenusFonciers = revenus_fonciers_1.RevenusFonciers;
var RevenusCapitauxMobiliers = (function (_super) {
    __extends(RevenusCapitauxMobiliers, _super);
    function RevenusCapitauxMobiliers() {
        _super.apply(this, arguments);
    }
    return RevenusCapitauxMobiliers;
})(RevenuCategoriel);
exports.RevenusCapitauxMobiliers = RevenusCapitauxMobiliers;
var PlusValues = (function (_super) {
    __extends(PlusValues, _super);
    function PlusValues() {
        _super.apply(this, arguments);
    }
    return PlusValues;
})(RevenuCategoriel);
exports.PlusValues = PlusValues;
var RemunerationDirigeant62 = (function (_super) {
    __extends(RemunerationDirigeant62, _super);
    function RemunerationDirigeant62() {
        _super.apply(this, arguments);
    }
    return RemunerationDirigeant62;
})(RevenuCategoriel);
exports.RemunerationDirigeant62 = RemunerationDirigeant62;
var BeneficesNonCommerciaux = (function (_super) {
    __extends(BeneficesNonCommerciaux, _super);
    function BeneficesNonCommerciaux() {
        _super.apply(this, arguments);
    }
    return BeneficesNonCommerciaux;
})(RevenuCategoriel);
exports.BeneficesNonCommerciaux = BeneficesNonCommerciaux;
var BeneficesCommerciaux = (function (_super) {
    __extends(BeneficesCommerciaux, _super);
    function BeneficesCommerciaux() {
        _super.apply(this, arguments);
    }
    return BeneficesCommerciaux;
})(RevenuCategoriel);
exports.BeneficesCommerciaux = BeneficesCommerciaux;
var BeneficesAgricoles = (function (_super) {
    __extends(BeneficesAgricoles, _super);
    function BeneficesAgricoles() {
        _super.apply(this, arguments);
    }
    return BeneficesAgricoles;
})(RevenuCategoriel);
exports.BeneficesAgricoles = BeneficesAgricoles;
