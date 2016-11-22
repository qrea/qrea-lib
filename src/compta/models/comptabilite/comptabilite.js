var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
;
var Comptabilite = (function (_super) {
    __extends(Comptabilite, _super);
    function Comptabilite(params) {
        if (params === void 0) { params = null; }
        _super.call(this, params);
        this.entreprise = params && params.entreprise || null;
        this.exercices = params && params.exercices || new Array();
    }
    return Comptabilite;
})(base_1.default.BaseModel);
exports.Comptabilite = Comptabilite;
