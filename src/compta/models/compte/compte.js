var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var Compte = (function (_super) {
    __extends(Compte, _super);
    function Compte(params) {
        _super.call(this, params);
        this.libelle = params.libelle || null;
        this.numero = params.numero || null;
    }
    return Compte;
})(base_1.default.BaseModel);
exports.Compte = Compte;
