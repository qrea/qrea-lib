var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var Identification = (function (_super) {
    __extends(Identification, _super);
    function Identification(params) {
        if (params === void 0) { params = null; }
        _super.call(this, params);
        this.SIREN = params ? params.SIREN : null;
        this.NIC = params ? params.NIC : null;
        this.APE = params ? params.APE : null;
        this.RCS = params ? params.RCS : null;
        this.RM = params ? params.RM : null;
    }
    Object.defineProperty(Identification.prototype, "SIRET", {
        get: function () {
            return this.SIREN + this.NIC;
        },
        enumerable: true,
        configurable: true
    });
    return Identification;
})(base_1.default.BaseModel);
exports.Identification = Identification;
