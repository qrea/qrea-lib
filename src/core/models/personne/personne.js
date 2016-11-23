var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var adresse_1 = require('../adresse/adresse');
var identification_1 = require('../identification/identification');
var Personne = (function (_super) {
    __extends(Personne, _super);
    function Personne(params) {
        if (params === void 0) { params = null; }
        _super.call(this, params);
        this.adresse = params ? params.adresse : new adresse_1.Adresse({});
        this.isEntreprise = params ? params.isEntreprise : false;
        this.numeroTVA = params ? params.numeroTVA : null;
        this.telephone = params ? params.telephone : null;
        this.email = params ? params.email : null;
        this.siteInternet = params ? params.siteInternet : null;
        this.fax = params ? params.fax : null;
        this.identification = params ? params.identification : new identification_1.Identification();
    }
    Personne.instanciatePhysiqueOuMorale = function (newPersonne) {
        if (!newPersonne.denominationSociale) {
            return PersonnePhysique.instanciate(newPersonne);
        }
        else {
            return PersonneMorale.instanciate(newPersonne);
        }
    };
    Object.defineProperty(Personne.prototype, "adresse", {
        get: function () {
            return this._adresse;
        },
        set: function (a) {
            this._adresse = adresse_1.Adresse.instanciate(a);
        },
        enumerable: true,
        configurable: true
    });
    return Personne;
})(base_1.default.BaseModel);
exports.Personne = Personne;
var PersonnePhysique = (function (_super) {
    __extends(PersonnePhysique, _super);
    function PersonnePhysique(params) {
        if (params === void 0) { params = null; }
        _super.call(this, params);
        this.civilite = params ? params.civilite : null;
        this.nom = params ? params.nom : null;
        this.prenom = params ? params.prenom : null;
        this.nomCommercial = params ? params.nomCommercial : null;
    }
    return PersonnePhysique;
})(Personne);
exports.PersonnePhysique = PersonnePhysique;
var PersonneMorale = (function (_super) {
    __extends(PersonneMorale, _super);
    function PersonneMorale(params) {
        if (params === void 0) { params = null; }
        _super.call(this, params);
        this.forme = params ? params.forme : null;
        this.denominationSociale = params ? params.denominationSociale : null;
        this.capitalSocial = params ? params.capitalSocial : null;
        this.isCapitalVariable = params ? params.isCapitalVariable : false;
    }
    return PersonneMorale;
})(Personne);
exports.PersonneMorale = PersonneMorale;
