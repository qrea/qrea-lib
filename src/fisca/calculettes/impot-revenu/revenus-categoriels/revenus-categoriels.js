var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RevenuCategoriel = (function () {
    function RevenuCategoriel() {
    }
    return RevenuCategoriel;
})();
exports.RevenuCategoriel = RevenuCategoriel;
var traitements_salaires_1 = require('./traitements-salaires/traitements-salaires');
exports.TraitementsSalaires = traitements_salaires_1.TraitementsSalaires;
var RevenusFonciers = (function (_super) {
    __extends(RevenusFonciers, _super);
    function RevenusFonciers() {
        _super.apply(this, arguments);
    }
    return RevenusFonciers;
})(RevenuCategoriel);
exports.RevenusFonciers = RevenusFonciers;
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
