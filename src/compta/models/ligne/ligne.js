var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var Ligne = (function (_super) {
    __extends(Ligne, _super);
    function Ligne(params) {
        _super.call(this, params);
        this.compteLib = params.compteLib || null;
        this.compteNum = params.compteNum || null;
        this.credit = params.credit || 0;
        this.debit = params.debit || 0;
    }
    return Ligne;
})(base_1.default.BaseModel);
exports.Ligne = Ligne;
