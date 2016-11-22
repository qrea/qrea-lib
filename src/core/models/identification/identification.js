var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var Identification = (function (_super) {
    __extends(Identification, _super);
    function Identification(params) {
        _super.call(this, params);
        this.SIREN = params.SIREN;
        this.NIC = params.NIC;
        this.APE = params.APE;
        this.RCS = params.RCS || null;
        this.RM = params.RM || null;
        this.SIRET = this.SIREN + this.NIC;
    }
    return Identification;
})(base_1.default.BaseModel);
exports.Identification = Identification;
