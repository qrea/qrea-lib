var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var adresse_1 = require('../adresse/adresse');
var Personne = (function (_super) {
    __extends(Personne, _super);
    function Personne(params) {
        _super.call(this, params);
        this.adresse = params.adresse;
        this.isEntreprise = params.isEntreprise || false;
        this.numeroTVA = params.numeroTVA || null;
        this.telephone = params.telephone || null;
        this.email = params.email || null;
        this.siteInternet = params.siteInternet || null;
        this.fax = params.fax || null;
        this.identification = params.identification || null;
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
        _super.call(this, params);
        this.civilite = params.civilite || null;
        this.nom = params.nom || null;
        this.prenom = params.prenom || null;
        this.nomCommercial = params.nomCommercial || null;
    }
    return PersonnePhysique;
})(Personne);
exports.PersonnePhysique = PersonnePhysique;
var PersonneMorale = (function (_super) {
    __extends(PersonneMorale, _super);
    function PersonneMorale(params) {
        _super.call(this, params);
        this.forme = params.forme;
        this.denominationSociale = params.denominationSociale;
        this.capitalSocial = params.capitalSocial || null;
        this.isCapitalVariable = params.isCapitalVariable || false;
    }
    return PersonneMorale;
})(Personne);
exports.PersonneMorale = PersonneMorale;
