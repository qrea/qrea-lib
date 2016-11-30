var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RevenusCategoriels = require('../revenus-categoriels');
exports.CONSTANTES_TS_2015 = {
    MINI_ABATTEMENT: 426,
    MAXI_ABATTEMENT: 12170,
    ABATTEMENT: 0.1
};
exports.CONSTANTES_PENSIONS_2015 = {
    MINI_ABATTEMENT: 379,
    MAXI_ABATTEMENT: 3711,
    ABATTEMENT: 0.1
};
(function (typeTraitementSalaire) {
    typeTraitementSalaire[typeTraitementSalaire["traitementSalaire"] = 0] = "traitementSalaire";
    typeTraitementSalaire[typeTraitementSalaire["pension"] = 1] = "pension";
})(exports.typeTraitementSalaire || (exports.typeTraitementSalaire = {}));
var typeTraitementSalaire = exports.typeTraitementSalaire;
var TraitementsSalaires = (function (_super) {
    __extends(TraitementsSalaires, _super);
    function TraitementsSalaires(params) {
        if (params === void 0) { params = null; }
        _super.call(this);
        this._typeRevenu = typeTraitementSalaire.traitementSalaire;
        this._revenuBrut = 0;
        this._fraisReel = 0;
        this.categorie = 'Traitements et salaires';
        this.categorieShort = 'TS';
        if (params) {
            this.typeRevenu = params.typeRevenu ? params.typeRevenu : typeTraitementSalaire.traitementSalaire;
            this.revenuBrut = params.revenuBrut ? params.revenuBrut : 0;
            this.fraisReel = params.fraisReel ? params.fraisReel : 0;
        }
    }
    Object.defineProperty(TraitementsSalaires.prototype, "typeRevenu", {
        get: function () {
            return this._typeRevenu;
        },
        set: function (v) {
            this._typeRevenu = v;
            this.calculer();
        },
        enumerable: true,
        configurable: true
    });
    TraitementsSalaires.prototype.calculer = function () {
        switch (this.typeRevenu) {
            case typeTraitementSalaire.pension:
                this.revenuNet = this.calculetNetImposablePensions(this.revenuBrut);
                break;
            case typeTraitementSalaire.traitementSalaire:
                this.revenuNet = this.calculerNetImposableTraitementsSalaires(this.revenuBrut, this.fraisReel);
                break;
            default:
                break;
        }
    };
    Object.defineProperty(TraitementsSalaires.prototype, "revenuBrut", {
        get: function () {
            return this._revenuBrut;
        },
        set: function (v) {
            this._revenuBrut = v;
            this.calculer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TraitementsSalaires.prototype, "fraisReel", {
        get: function () {
            return this._fraisReel;
        },
        set: function (v) {
            this._fraisReel = v;
            this.calculer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TraitementsSalaires.prototype, "description", {
        get: function () {
            var d = '';
            if (this.typeRevenu = typeTraitementSalaire.pension) {
                d += 'Pension ';
            }
            else if (this.typeRevenu = typeTraitementSalaire.traitementSalaire) {
                d += 'Salaire ';
            }
            d += this.revenuNet;
            return d;
        },
        enumerable: true,
        configurable: true
    });
    TraitementsSalaires.prototype.calculerNetImposableTraitementsSalaires = function (brut, fraisReel) {
        // console.log('calculerNetImposableTraitementsSalaires(%s, %s: number = 0', brut, fraisReel);
        if (fraisReel === void 0) { fraisReel = 0; }
        if (brut === 0)
            return 0;
        var abatt = brut * exports.CONSTANTES_TS_2015['ABATTEMENT'];
        if (abatt > exports.CONSTANTES_TS_2015['MAXI_ABATTEMENT']) {
            abatt = exports.CONSTANTES_TS_2015['MAXI_ABATTEMENT'];
        }
        else if (abatt < exports.CONSTANTES_TS_2015['MINI_ABATTEMENT']) {
            abatt = exports.CONSTANTES_TS_2015['MINI_ABATTEMENT'];
        }
        abatt = abatt > fraisReel ? abatt : fraisReel;
        var net = brut - abatt;
        return net;
    };
    TraitementsSalaires.prototype.calculetNetImposablePensions = function (brut) {
        if (brut === 0)
            return 0;
        var abatt = brut * exports.CONSTANTES_PENSIONS_2015['ABATTEMENT'];
        if (abatt > exports.CONSTANTES_PENSIONS_2015['MAXI_ABATTEMENT']) {
            abatt = exports.CONSTANTES_PENSIONS_2015['MAXI_ABATTEMENT'];
        }
        else if (abatt < exports.CONSTANTES_PENSIONS_2015['MINI_ABATTEMENT']) {
            abatt = exports.CONSTANTES_PENSIONS_2015['MINI_ABATTEMENT'];
        }
        var net = brut - abatt;
        return net;
    };
    return TraitementsSalaires;
})(RevenusCategoriels.RevenuCategoriel);
exports.TraitementsSalaires = TraitementsSalaires;
