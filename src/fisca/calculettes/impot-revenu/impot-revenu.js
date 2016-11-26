var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var calculettes_1 = require('../calculettes');
exports.DICTIONNAIRE_CONSTANTES = {
    2015: {
        PLAFOND_QUOTIENT_FAMILIAL: 1510,
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
    }
};
var ImpotRevenuCalculette = (function (_super) {
    __extends(ImpotRevenuCalculette, _super);
    function ImpotRevenuCalculette(params) {
        _super.call(this, params);
    }
    ImpotRevenuCalculette.prototype.calculer = function () {
    };
    ImpotRevenuCalculette.calculerImpotBrut = function (revenuNetGlobal, nbParts) {
        var res = 0;
        var q = revenuNetGlobal / nbParts;
        function calculerBarême(q) {
            var impot1Part = 0;
            var impotTranche = 0;
            exports.DICTIONNAIRE_CONSTANTES['2015']['BAREME_IR'].forEach(function (tranche, i, arr) {
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
                console.log('r %s, tranche.plafond %s, impotTranche %s', q, tranche.PLAFOND, impotTranche);
                impot1Part += impotTranche;
            });
            console.log('impot brut 1 part %s', impot1Part);
            return Math.round(impot1Part);
        }
        var impotBrut = calculerBarême(q) * nbParts;
        console.log('impot brut %s', impotBrut);
        if (nbParts > 2) {
            var plafondQuotientApplicable = (nbParts - 2) / 0.5 * exports.DICTIONNAIRE_CONSTANTES['2015']['PLAFOND_QUOTIENT_FAMILIAL'];
            var ir = calculerBarême(revenuNetGlobal / 2) * 2;
            if (impotBrut < ir - plafondQuotientApplicable) {
                impotBrut = ir - plafondQuotientApplicable;
            }
        }
        return impotBrut;
    };
    return ImpotRevenuCalculette;
})(calculettes_1.BaseCalculette);
exports.ImpotRevenuCalculette = ImpotRevenuCalculette;
