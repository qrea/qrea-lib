var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var Exercice = (function (_super) {
    __extends(Exercice, _super);
    function Exercice(params) {
        _super.call(this, params);
        this.cloture = params.cloture || null;
        this.duree = params.duree || 12;
        this.journaux = params.journaux || new Array();
    }
    Exercice.prototype.getJournalByCode = function (code) {
        var journal = null;
        this.journaux.forEach(function (j) {
            if (j.code === code)
                journal = j;
        });
        return journal;
    };
    Exercice.prototype.getSolde = function (c, filter) {
        if (filter === void 0) { filter = null; }
        var numero = c;
        var solde = 0;
        this.journaux.forEach(function (j) {
            solde += j.getSolde(c, filter);
        });
        return solde;
    };
    return Exercice;
})(base_1.default.BaseModel);
exports.Exercice = Exercice;
