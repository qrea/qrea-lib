var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../facturation.ts" />
var base_1 = require('../../base/base');
var Facturation;
(function (Facturation) {
    var Models;
    (function (Models) {
        var Adresse = (function (_super) {
            __extends(Adresse, _super);
            function Adresse(params) {
                _super.call(this, params);
                if (!params.nom && !params.cp && params.ville)
                    throw new Error('Le model \'Adresse\' requiert des paramètres \'nom\', \'cp\', \'ville\' non nuls');
                this.nom = params.nom;
                this.ligne1 = params.ligne1;
                this.ligne2 = params.ligne2 || null;
                this.cp = params.cp;
                this.ville = params.ville;
                this.pays = params.pays || null;
            }
            return Adresse;
        })(base_1.default.BaseModel);
        exports.default = Adresse;
    })(Models = Facturation.Models || (Facturation.Models = {}));
})(Facturation || (Facturation = {}));
//# sourceMappingURL=Adresse.js.map