var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var Ecriture = (function (_super) {
    __extends(Ecriture, _super);
    function Ecriture(params) {
        _super.call(this, params);
        this.dateLet = params.dateLet || null;
        this.ecritureDate = params.ecritureDate || null;
        this.libelle = params.libelle || null;
        this.ecritureLet = params.ecritureLet || null;
        this.pieceRef = params.pieceRef || null;
        this.pieceDate = params.pieceDate || null;
        this.validDate = params.validDate || null;
        this.lignes = params.lignes || [];
    }
    Ecriture.prototype.addLigne = function (l) {
        this.lignes.push(l);
    };
    Ecriture.prototype.checkEquilibre = function () {
        if (this.lignes.length < 1) {
            return true;
        }
        else if (this.lignes.length === 1) {
            return false;
        }
        else {
            var totalDebit = 0;
            var totalCredit = 0;
            this.lignes.forEach(function (l) {
                totalDebit += l.debit;
                totalCredit += l.credit;
            }, this);
            return totalDebit === totalCredit;
        }
    };
    Object.defineProperty(Ecriture.prototype, "equilibre", {
        get: function () {
            return this.checkEquilibre();
        },
        enumerable: true,
        configurable: true
    });
    return Ecriture;
})(base_1.default.BaseModel);
exports.Ecriture = Ecriture;
;
