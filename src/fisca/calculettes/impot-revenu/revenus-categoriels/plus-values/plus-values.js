var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RevenusCategoriels = require('../revenus-categoriels');
var moment = require('moment');
exports.CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015 = {
    ABATTEMENT_FIXE_DEPART_RETRAITE: 500000,
    ABATTEMENTS_REGIME_DROIT_COMMUN: [
        {
            detentionMax: 2,
            taux: 0
        },
        {
            detentionMax: 8,
            taux: 0.5
        },
        {
            detentionMax: -1,
            taux: 0.65
        }
    ],
    ABATTEMENTS_REGIME_INCITATIF: [
        {
            detentionMax: 1,
            taux: 0
        },
        {
            detentionMax: 4,
            taux: 0.5
        },
        {
            detentionMax: 8,
            taux: 0.65
        },
        {
            detentionMax: -1,
            taux: 0.85
        }
    ]
};
(function (regimeCessionValeurMobiliere) {
    regimeCessionValeurMobiliere[regimeCessionValeurMobiliere["droitCommun"] = 0] = "droitCommun";
    regimeCessionValeurMobiliere[regimeCessionValeurMobiliere["incitatif"] = 1] = "incitatif";
    regimeCessionValeurMobiliere[regimeCessionValeurMobiliere["departRetraite"] = 2] = "departRetraite";
})(exports.regimeCessionValeurMobiliere || (exports.regimeCessionValeurMobiliere = {}));
var regimeCessionValeurMobiliere = exports.regimeCessionValeurMobiliere;
(function (typeCession) {
    typeCession[typeCession["titres"] = 0] = "titres";
    typeCession[typeCession["cessionPEA"] = 1] = "cessionPEA";
})(exports.typeCession || (exports.typeCession = {}));
var typeCession = exports.typeCession;
var PlusValues = (function (_super) {
    __extends(PlusValues, _super);
    function PlusValues() {
        _super.call(this);
        this.categorie = 'Plus value';
        this.categorieShort = 'PV';
        this._regime = regimeCessionValeurMobiliere.droitCommun;
        this._typeCession = typeCession.titres;
        this._dateAcquisition = new Date();
        this._dateCession = new Date();
        this._dureeDetention = 0;
        this._prixRevient = 0;
        this._prixCession = 0;
        this._plusValueBrute = 0;
    }
    Object.defineProperty(PlusValues.prototype, "description", {
        get: function () {
            var d = '';
            if (this.revenuNet < 0) {
                d += 'Plus value ' + this.revenuNet;
            }
            else {
                d += 'Moins value reportable ' + this.revenuNet;
            }
            return d;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValues.prototype, "regime", {
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
    Object.defineProperty(PlusValues.prototype, "typeCession", {
        get: function () {
            return this._typeCession;
        },
        set: function (v) {
            this._typeCession = v;
            this.calcuerRevenuNet();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValues.prototype, "dateAcquisition", {
        get: function () {
            return this._dateAcquisition;
        },
        set: function (v) {
            this._dateAcquisition = v;
            this.calcuerRevenuNet();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValues.prototype, "dateCession", {
        get: function () {
            return this._dateCession;
        },
        set: function (v) {
            this._dateCession = v;
            this.calcuerRevenuNet();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValues.prototype, "dureeDetention", {
        get: function () {
            return this._dureeDetention;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValues.prototype, "prixRevient", {
        get: function () {
            return this._prixRevient;
        },
        set: function (v) {
            this._prixRevient = v;
            this.calcuerRevenuNet();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValues.prototype, "prixCession", {
        get: function () {
            return this._prixCession;
        },
        set: function (v) {
            this._prixCession = v;
            this.calcuerRevenuNet();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlusValues.prototype, "plusValueBrute", {
        get: function () {
            return this._plusValueBrute;
        },
        enumerable: true,
        configurable: true
    });
    PlusValues.prototype.calcuerRevenuNet = function () {
        this._plusValueBrute = this.prixCession - this.prixRevient;
        if (this.plusValueBrute < 0) {
            this.revenuNet = this.plusValueBrute;
            return;
        }
        var old = moment(this.dateAcquisition);
        var n = moment(this.dateCession);
        this._dureeDetention = n.diff(old, 'years');
        var abatt = 0;
        var tauxAbatt = 0;
        switch (this.regime) {
            case regimeCessionValeurMobiliere.droitCommun:
                tauxAbatt = this.getTauxAbattement(this.dureeDetention, 'ABATTEMENTS_REGIME_DROIT_COMMUN');
                abatt = Math.round(this.plusValueBrute * tauxAbatt);
                break;
            case regimeCessionValeurMobiliere.incitatif:
                tauxAbatt = this.getTauxAbattement(this.dureeDetention, 'ABATTEMENTS_REGIME_INCITATIF');
                abatt = Math.round(tauxAbatt * this.plusValueBrute);
                break;
            case regimeCessionValeurMobiliere.departRetraite:
                tauxAbatt = this.getTauxAbattement(this.dureeDetention, 'ABATTEMENTS_REGIME_INCITATIF');
                if (this.plusValueBrute <= exports.CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015['ABATTEMENT_FIXE_DEPART_RETRAITE']) {
                    abatt = this.plusValueBrute;
                }
                else {
                    var baseAbatt = this.plusValueBrute - exports.CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015['ABATTEMENT_FIXE_DEPART_RETRAITE'];
                    abatt = Math.round(baseAbatt * tauxAbatt);
                    abatt += exports.CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015['ABATTEMENT_FIXE_DEPART_RETRAITE'];
                }
                break;
            default:
                tauxAbatt = this.getTauxAbattement(this.dureeDetention, 'ABATTEMENTS_REGIME_INCITATIF');
                abatt = Math.round(tauxAbatt * this.plusValueBrute);
                break;
        }
        this.revenuNet = this.plusValueBrute - abatt;
        if (this.revenuNet < 0)
            this.revenuNet = 0;
    };
    PlusValues.prototype.getTauxAbattement = function (dureeDetention, key) {
        var abatt = exports.CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015[key][exports.CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015[key].length - 1].taux;
        exports.CONSTANTES_PLUS_VALUE_VALEUR_MOBILIERE_2015[key].forEach(function (abattement, i, arr) {
            var detentionMaxPrec = arr[i - 1] ? arr[i - 1].detentionMax : 0;
            if (dureeDetention < abattement.detentionMax && dureeDetention > detentionMaxPrec) {
                abatt = abattement.taux;
            }
        });
        return abatt;
    };
    return PlusValues;
})(RevenusCategoriels.RevenuCategoriel);
exports.PlusValues = PlusValues;
