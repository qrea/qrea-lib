var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base/base');
var RevenusCategoriels = require('./revenus-categoriels/revenus-categoriels');
exports.RevenusCategoriels = RevenusCategoriels;
var DICTIONNAIRE_CONSTANTES_2015 = {
    PLAFOND_QUOTIENT_FAMILIAL: 1510,
    PLAFOND_DECOTE_CELIBATAIRE: 1165,
    PLAFOND_DECOTE_COUPLE: 1920,
    BAREME_IR: [
        {
            PLAFOND: 9700,
            TAUX: 0
        },
        {
            PLAFOND: 26791,
            TAUX: 0.14
        },
        {
            PLAFOND: 71826,
            TAUX: 0.3
        },
        {
            PLAFOND: 152108,
            TAUX: 0.41
        },
        {
            PLAFOND: -1,
            TAUX: 0.45
        }
    ]
};
exports.DICTIONNAIRE_CONSTANTES = {
    "2015": DICTIONNAIRE_CONSTANTES_2015
};
var ImpotRevenuCalculette = (function (_super) {
    __extends(ImpotRevenuCalculette, _super);
    function ImpotRevenuCalculette(params) {
        _super.call(this, params);
        this._revenuNetGlobal = 0;
        this.nbParts = 1;
        this._couple = false;
        this.revenus = new Array();
        this._impotBrut = 0;
        this.CONSTANTES_CALCUL = exports.DICTIONNAIRE_CONSTANTES[params.millesime] ? exports.DICTIONNAIRE_CONSTANTES[params.millesime] : null;
        this.nbEnfants = params.nbEnfants ? params.nbEnfants : 0;
        this.couple = params.couple ? params.couple : false;
        this.revenuNetGlobal = params.revenuNetGlobal ? params.revenuNetGlobal : 0;
    }
    Object.defineProperty(ImpotRevenuCalculette.prototype, "revenuNetGlobal", {
        get: function () {
            return this._revenuNetGlobal;
        },
        set: function (value) {
            this._revenuNetGlobal = value;
            this.calculer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImpotRevenuCalculette.prototype, "couple", {
        get: function () {
            return this._couple;
        },
        set: function (v) {
            this._couple = v;
            this.impotBrut = this.calculerImpotBrut();
            this.calculer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImpotRevenuCalculette.prototype, "nbEnfants", {
        get: function () {
            return this._nbEnfants;
        },
        set: function (v) {
            this._nbEnfants = v;
            this.calculer();
        },
        enumerable: true,
        configurable: true
    });
    ImpotRevenuCalculette.prototype.calculerNbParts = function () {
        if (this._nbEnfants <= 2) {
            this.nbParts = this._nbEnfants * 0.5;
        }
        else {
            this.nbParts = 1 + (this.nbEnfants - 2) * 1;
        }
        this.nbParts += this.couple ? 2 : 1;
    };
    ImpotRevenuCalculette.prototype.ajouterRevenu = function (revenu) {
        var _this = this;
        revenu.handler = function (oldval, val) {
            var total = 0;
            _this.revenus.forEach(function (r) {
                total += r.revenuNet;
            });
            _this.revenuNetGlobal = total;
        };
        this.revenus.push(revenu);
    };
    Object.defineProperty(ImpotRevenuCalculette.prototype, "impotBrut", {
        get: function () {
            return this._impotBrut;
        },
        set: function (v) {
            this._impotBrut = v;
        },
        enumerable: true,
        configurable: true
    });
    ImpotRevenuCalculette.prototype.calculer = function (nePasMaj) {
        if (nePasMaj === void 0) { nePasMaj = true; }
        this.calculerNbParts();
        this.impotBrut = this.calculerImpotBrut();
    };
    ImpotRevenuCalculette.prototype.calculerImpotBrut = function () {
        var res = 0;
        var q = this.revenuNetGlobal / this.nbParts;
        function calculerBarême(q, bareme) {
            var impot1Part = 0;
            var impotTranche = 0;
            bareme.forEach(function (tranche, i, arr) {
                var plafondInferieur = i > 0 ? arr[i - 1].PLAFOND : 0;
                if (q <= tranche.PLAFOND && plafondInferieur <= q) {
                    impotTranche = (q - plafondInferieur) * tranche.TAUX;
                }
                else if (q > tranche.PLAFOND && tranche.PLAFOND > -1) {
                    impotTranche = tranche.TAUX * (tranche.PLAFOND - plafondInferieur);
                }
                else if (tranche.PLAFOND === -1 && q > plafondInferieur) {
                    impotTranche = (q - plafondInferieur) * tranche.TAUX;
                }
                else {
                    impotTranche = 0;
                }
                impot1Part += impotTranche;
            });
            return Math.round(impot1Part);
        }
        var impotBrut = calculerBarême(q, this.CONSTANTES_CALCUL['BAREME_IR']) * this.nbParts;
        if (this.nbParts > 2) {
            var plafondQuotientApplicable = (this.nbParts - 2) / 0.5 * exports.DICTIONNAIRE_CONSTANTES['2015']['PLAFOND_QUOTIENT_FAMILIAL'];
            var ir = calculerBarême(this.revenuNetGlobal / 2, this.CONSTANTES_CALCUL['BAREME_IR']) * 2;
            if (impotBrut < ir - plafondQuotientApplicable) {
                impotBrut = ir - plafondQuotientApplicable;
            }
        }
        var plafond = this.couple === false ? this.CONSTANTES_CALCUL['PLAFOND_DECOTE_CELIBATAIRE'] : this.CONSTANTES_CALCUL['PLAFOND_DECOTE_COUPLE'];
        var decote = Math.round(plafond - 0.75 * impotBrut);
        if (decote > 0)
            impotBrut -= decote;
        if (impotBrut < 0)
            impotBrut = 0;
        return impotBrut;
    };
    return ImpotRevenuCalculette;
})(base_1.BaseCalculette);
exports.ImpotRevenuCalculette = ImpotRevenuCalculette;
