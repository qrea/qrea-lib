var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var Reglement = (function (_super) {
    __extends(Reglement, _super);
    function Reglement(params) {
        _super.call(this, params);
        this.delai = params.delai;
        this.montant = params.montant;
        this.pourcentage = params.pourcentage;
        this.finDeMois = params.finDeMois;
        this.paye = params.paye;
    }
    return Reglement;
})(base_1.default.BaseModel);
exports.Reglement = Reglement;
