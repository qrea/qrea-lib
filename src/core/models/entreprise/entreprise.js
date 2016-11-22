var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../../../base/base');
var personne_1 = require('../personne/personne');
var identification_1 = require('../identification/identification');
var Entreprise = (function (_super) {
    __extends(Entreprise, _super);
    function Entreprise(params) {
        _super.call(this, params);
        if (!params.personne)
            throw new Error('Le model \'Entreprise\' requiert une propriété \'personne\' valide');
        this.personne = params.personne;
        this.isAdherentCGA = params.isAdherentCGA;
        this.isExonere = params.isExonere;
        this.isAssujettiTVA = params.isAssujettiTVA;
        this.isFranchiseEnBase = params.isFranchiseEnBase;
        this.isRegimeMargeBeneficiaire = params.isRegimeMargeBeneficiaire;
        this.isAutoliquidation = params.isAutoliquidation;
        this.identification = params.identification;
        this.numeroTVA = params.numeroTVA;
        this.capital = params.capital;
        this.isCapitalVariable = params.isCapitalVariable;
        this.tauxPenalitesReglement = params.tauxPenalitesReglement;
        this.conditionsEscompte = params.conditionsEscompte;
        this.mentionsParticulieres = params.mentionsParticulieres;
        this.modeReglementDefaut = params.modeReglementDefaut;
    }
    Object.defineProperty(Entreprise.prototype, "personne", {
        get: function () {
            return this._personne;
        },
        set: function (p) {
            this._personne = personne_1.Personne.instanciatePhysiqueOuMorale(p);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entreprise.prototype, "identification", {
        get: function () {
            return this._identification;
        },
        set: function (i) {
            this._identification = identification_1.Identification.instanciate(i);
        },
        enumerable: true,
        configurable: true
    });
    return Entreprise;
})(base_1.default.BaseModel);
exports.Entreprise = Entreprise;
