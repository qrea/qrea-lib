var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var Adresse = (function (_super) {
    __extends(Adresse, _super);
    function Adresse(params) {
        _super.call(this, params);
        this.nom = params ? params.nom : null;
        this.ligne1 = params ? params.ligne1 : null;
        this.ligne2 = params ? params.ligne2 : null;
        this.cp = params ? params.cp : null;
        this.ville = params ? params.ville : null;
        this.pays = params ? params.pays : null;
    }
    return Adresse;
})(base_1.default.BaseModel);
exports.Adresse = Adresse;
